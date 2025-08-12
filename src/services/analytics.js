const _ = require('lodash');

class AnalyticsService {
  constructor(capacitiesAPI) {
    this.api = capacitiesAPI;
  }

  // Calcular estatísticas gerais do espaço
  async getSpaceStatistics() {
    try {
      const spaceInfo = await this.api.getSpaceInfo();
      
      const stats = {
        totalStructures: spaceInfo.structures?.length || 0,
        totalCollections: 0,
        totalObjects: 0,
        structures: {},
        topStructures: [],
        recentActivity: []
      };

      // Contar objetos por estrutura
      for (const structure of spaceInfo.structures || []) {
        try {
          const objects = await this.api.getObjectsByStructure(structure.id, 1000);
          const objectCount = objects.objects?.length || 0;
          
          stats.structures[structure.id] = {
            name: structure.name,
            count: objectCount,
            type: structure.type
          };
          
          stats.totalObjects += objectCount;
        } catch (error) {
          console.warn(`Não foi possível contar objetos da estrutura ${structure.id}:`, error.message);
        }
      }

      // Ordenar estruturas por número de objetos
      stats.topStructures = Object.entries(stats.structures)
        .sort(([,a], [,b]) => b.count - a.count)
        .slice(0, 10);

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
