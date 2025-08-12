const _ = require('lodash');

class AnalyticsService {
  constructor(capacitiesAPI) {
    this.api = capacitiesAPI;
  }

  // Calcular estatísticas gerais do espaço
  async getSpaceStatistics() {
    try {
      const spaceInfo = await this.api.getSpaceInfo();
      
      console.log('🏗️ Raw space info:', spaceInfo);
      
      const stats = {
        totalStructures: spaceInfo.structures?.length || 0,
        totalCollections: 0,
        totalObjects: 0,
        structures: {},
        topStructures: [],
        recentActivity: []
      };

      // Usar apenas os dados disponíveis da API (sem tentar buscar objetos)
      if (spaceInfo.structures && Array.isArray(spaceInfo.structures)) {
        for (const structure of spaceInfo.structures) {
          // Como não podemos contar objetos ainda, vamos usar dados básicos
          stats.structures[structure.id] = {
            name: structure.name || structure.id,
            count: 0, // Não disponível ainda
            type: structure.type || 'unknown',
            id: structure.id
          };
          
                  // Usar o título real da API, com fallback para nomes conhecidos
        if (structure.title) {
          stats.structures[structure.id].name = structure.title;
        } else if (structure.id === 'RootPage') {
          stats.structures[structure.id].name = 'Pages';
        } else if (structure.id === 'RootDatabase') {
          stats.structures[structure.id].name = 'Collections';
          stats.totalCollections++;
        } else if (structure.id === 'MediaImage') {
          stats.structures[structure.id].name = 'Images';
        } else if (structure.id === 'MediaPDF') {
          stats.structures[structure.id].name = 'PDFs';
        } else if (structure.id === 'RootTag') {
          stats.structures[structure.id].name = 'Tags';
        } else if (structure.id === 'RootQuery') {
          stats.structures[structure.id].name = 'Queries';
        } else if (structure.id === 'RootAIChat') {
          stats.structures[structure.id].name = 'AI Chats';
        } else if (structure.id === 'RootSimpleTable') {
          stats.structures[structure.id].name = 'Tables';
        } else if (structure.id === 'RootDailyNote') {
          stats.structures[structure.id].name = 'Daily Notes';
        } else if (structure.id === 'MediaAudio') {
          stats.structures[structure.id].name = 'Audio Files';
        } else if (structure.id === 'MediaVideo') {
          stats.structures[structure.id].name = 'Video Files';
        } else if (structure.id === 'MediaWebResource') {
          stats.structures[structure.id].name = 'Web Links';
        } else if (structure.id === 'MediaFile') {
          stats.structures[structure.id].name = 'Files';
        } else if (structure.id === 'MediaTweet') {
          stats.structures[structure.id].name = 'Tweets';
        } else if (structure.id === 'RootStructure') {
          stats.structures[structure.id].name = 'Object Types';
        } else if (structure.id === 'RootSpace') {
          stats.structures[structure.id].name = 'Spaces';
        }
        }
      }

      // Ordenar estruturas por nome para facilitar navegação
      stats.topStructures = Object.entries(stats.structures)
        .sort(([,a], [,b]) => a.name.localeCompare(b.name))
        .slice(0, 10);

      console.log('📊 Processed stats:', stats);
      return stats;
    } catch (error) {
      console.error('Erro ao calcular estatísticas do espaço:', error.message);
      throw error;
    }
  }

  // Analisar propriedades numéricas de objetos
  async analyzeNumericProperties(structureId) {
    try {
      const objects = await this.api.getObjectsByStructure(structureId, 1000);
      const numericProperties = {};
      
      for (const obj of objects.objects || []) {
        if (obj.properties) {
          for (const [key, value] of Object.entries(obj.properties)) {
            if (typeof value === 'number') {
              if (!numericProperties[key]) {
                numericProperties[key] = [];
              }
              numericProperties[key].push(value);
            }
          }
        }
      }

      // Calcular estatísticas para cada propriedade numérica
      const analysis = {};
      for (const [property, values] of Object.entries(numericProperties)) {
        if (values.length > 0) {
          analysis[property] = {
            count: values.length,
            sum: _.sum(values),
            average: _.mean(values),
            min: _.min(values),
            max: _.max(values),
            median: this.calculateMedian(values),
            standardDeviation: this.calculateStandardDeviation(values)
          };
        }
      }

      return analysis;
    } catch (error) {
      console.error(`Erro ao analisar propriedades numéricas da estrutura ${structureId}:`, error.message);
      throw error;
    }
  }

  // Analisar referências entre objetos
  async analyzeObjectReferences(structureId) {
    try {
      const objects = await this.api.getObjectsByStructure(structureId, 1000);
      const references = {};
      const referencedBy = {};
      
      for (const obj of objects.objects || []) {
        if (obj.properties) {
          for (const [key, value] of Object.entries(obj.properties)) {
            // Verificar se a propriedade é uma referência a outro objeto
            if (typeof value === 'string' && value.includes('capacities://')) {
              const referencedId = value.split('/').pop();
              
              if (!references[key]) {
                references[key] = {};
              }
              if (!references[key][referencedId]) {
                references[key][referencedId] = 0;
              }
              references[key][referencedId]++;
              
              if (!referencedBy[referencedId]) {
                referencedBy[referencedId] = [];
              }
              referencedBy[referencedId].push({
                objectId: obj.id,
                property: key
              });
            }
          }
        }
      }

      return {
        references,
        referencedBy,
        totalReferences: Object.values(references).reduce((sum, refs) => 
          sum + Object.values(refs).reduce((s, count) => s + count, 0), 0
        )
      };
    } catch (error) {
      console.error(`Erro ao analisar referências da estrutura ${structureId}:`, error.message);
      throw error;
    }
  }

  // Analisar atividade temporal (se houver timestamps)
  async analyzeTemporalActivity(structureId) {
    try {
      const objects = await this.api.getObjectsByStructure(structureId, 1000);
      const temporalData = [];
      
      for (const obj of objects.objects || []) {
        if (obj.createdAt) {
          temporalData.push({
            date: new Date(obj.createdAt),
            objectId: obj.id
          });
        }
        if (obj.updatedAt) {
          temporalData.push({
            date: new Date(obj.updatedAt),
            objectId: obj.id,
            type: 'updated'
          });
        }
      }

      // Agrupar por período (dia, semana, mês)
      const dailyStats = _.groupBy(temporalData, item => 
        item.date.toISOString().split('T')[0]
      );

      const weeklyStats = _.groupBy(temporalData, item => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const week = Math.ceil((date.getDate() + new Date(year, date.getMonth(), 1).getDay()) / 7);
        return `${year}-W${week}`;
      });

      return {
        daily: Object.entries(dailyStats).map(([date, items]) => ({
          date,
          count: items.length
        })),
        weekly: Object.entries(weeklyStats).map(([week, items]) => ({
          week,
          count: items.length
        })),
        total: temporalData.length
      };
    } catch (error) {
      console.error(`Erro ao analisar atividade temporal da estrutura ${structureId}:`, error.message);
      throw error;
    }
  }

  // Calcular mediana
  calculateMedian(values) {
    const sorted = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    
    return sorted[middle];
  }

  // Calcular desvio padrão
  calculateStandardDeviation(values) {
    const mean = _.mean(values);
    const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
    const variance = _.mean(squaredDiffs);
    return Math.sqrt(variance);
  }

  // Gerar relatório completo de análise
  async generateFullReport() {
    try {
      const spaceStats = await this.getSpaceStatistics();
      const reports = {
        space: spaceStats,
        structures: {}
      };

      // Analisar cada estrutura individualmente
      for (const [structureId, structure] of Object.entries(spaceStats.structures)) {
        if (structure.count > 0) {
          try {
            reports.structures[structureId] = {
              basic: structure,
              numericProperties: await this.analyzeNumericProperties(structureId),
              references: await this.analyzeObjectReferences(structureId),
              temporal: await this.analyzeTemporalActivity(structureId)
            };
          } catch (error) {
            console.warn(`Erro ao analisar estrutura ${structureId}:`, error.message);
          }
        }
      }

      return reports;
    } catch (error) {
      console.error('Erro ao gerar relatório completo:', error.message);
      throw error;
    }
  }
}

module.exports = AnalyticsService;
