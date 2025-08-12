const express = require('express');
const router = express.Router();
const CapacitiesAPI = require('../config/capacities');
const AnalyticsService = require('../services/analytics');

const capacitiesAPI = new CapacitiesAPI();
const analyticsService = new AnalyticsService(capacitiesAPI);

// Test connection route
router.get('/test', async (req, res) => {
  try {
    const testResult = await capacitiesAPI.testConnection();
    res.json({
      success: testResult.success,
      data: testResult.data,
      error: testResult.error,
      details: testResult.details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Rota principal do dashboard
router.get('/', async (req, res) => {
  try {
    console.log('🔄 Generating full report...');
    const report = await analyticsService.generateFullReport();
    
    console.log('📊 Report generated:', {
      spaceStructures: report.space?.structures ? Object.keys(report.space.structures).length : 0,
      structuresData: report.space?.structures ? Object.keys(report.space.structures) : []
    });
    
    res.json({
      success: true,
      data: report,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error generating report:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Estatísticas gerais do espaço
router.get('/space-stats', async (req, res) => {
  try {
    const stats = await analyticsService.getSpaceStatistics();
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Análise de uma estrutura específica com propriedades mapeadas
router.get('/structure/:structureId', async (req, res) => {
  try {
    const { structureId } = req.params;
    
    const analysis = {
      basic: null,
      properties: [],
      propertyTypes: {},
      relationships: [],
      collections: []
    };

    try {
      // Obter informações da estrutura completa do espaço
      const spaceInfo = await capacitiesAPI.getSpaceInfo();
      const structure = spaceInfo.structures?.find(s => s.id === structureId);
      
      if (structure) {
        analysis.basic = {
          ...structure,
          objectCount: 0 // Não disponível ainda na API
        };

        // Mapear propriedades da estrutura
        if (structure.propertyDefinitions && Array.isArray(structure.propertyDefinitions)) {
          analysis.properties = structure.propertyDefinitions.map(prop => ({
            id: prop.id,
            name: prop.name,
            type: prop.type,
            required: prop.required || false,
            description: prop.description || '',
            options: prop.options || [],
            defaultValue: prop.defaultValue
          }));

          // Agrupar propriedades por tipo para estatísticas
          analysis.propertyTypes = structure.propertyDefinitions.reduce((types, prop) => {
            const type = prop.type || 'unknown';
            if (!types[type]) {
              types[type] = [];
            }
            types[type].push({
              id: prop.id,
              name: prop.name,
              required: prop.required || false
            });
            return types;
          }, {});
        }

        // Mapear coleções da estrutura
        if (structure.collections && Array.isArray(structure.collections)) {
          analysis.collections = structure.collections.map(collection => ({
            id: collection.id,
            name: collection.name,
            description: collection.description || ''
          }));
        }

        // Encontrar relacionamentos com outras estruturas
        const allStructures = spaceInfo.structures || [];
        analysis.relationships = allStructures
          .filter(otherStruct => otherStruct.id !== structureId)
          .map(otherStruct => {
            const hasRelationship = otherStruct.propertyDefinitions?.some(prop => 
              prop.type === 'object' && prop.structureId === structureId
            );
            
            if (hasRelationship) {
              return {
                structureId: otherStruct.id,
                structureName: otherStruct.title,
                type: 'referenced_by',
                properties: otherStruct.propertyDefinitions
                  ?.filter(prop => prop.type === 'object' && prop.structureId === structureId)
                  ?.map(prop => ({ id: prop.id, name: prop.name })) || []
              };
            }

            // Verificar se esta estrutura referencia outras
            const referencesOther = structure.propertyDefinitions?.some(prop => 
              prop.type === 'object' && prop.structureId === otherStruct.id
            );

            if (referencesOther) {
              return {
                structureId: otherStruct.id,
                structureName: otherStruct.title,
                type: 'references',
                properties: structure.propertyDefinitions
                  ?.filter(prop => prop.type === 'object' && prop.structureId === otherStruct.id)
                  ?.map(prop => ({ id: prop.id, name: prop.name })) || []
              };
            }

            return null;
          })
          .filter(rel => rel !== null);
      }
      
    } catch (error) {
      console.warn(`Erro ao analisar estrutura ${structureId}:`, error.message);
    }

    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Análise de propriedades numéricas de uma estrutura
router.get('/structure/:structureId/numeric-properties', async (req, res) => {
  try {
    const { structureId } = req.params;
    const analysis = await analyticsService.analyzeNumericProperties(structureId);
    
    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Análise de referências de uma estrutura
router.get('/structure/:structureId/references', async (req, res) => {
  try {
    const { structureId } = req.params;
    const analysis = await analyticsService.analyzeObjectReferences(structureId);
    
    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Análise temporal de uma estrutura
router.get('/structure/:structureId/temporal', async (req, res) => {
  try {
    const { structureId } = req.params;
    const analysis = await analyticsService.analyzeTemporalActivity(structureId);
    
    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Comparação entre estruturas
router.get('/compare', async (req, res) => {
  try {
    const { structureIds } = req.query;
    
    if (!structureIds || !Array.isArray(structureIds)) {
      return res.status(400).json({
        success: false,
        error: 'structureIds deve ser um array de IDs de estruturas'
      });
    }

    const comparison = {};
    
    for (const structureId of structureIds) {
      try {
        const objects = await capacitiesAPI.getObjectsByStructure(structureId, 1000);
        const numericProps = await analyticsService.analyzeNumericProperties(structureId);
        const references = await analyticsService.analyzeObjectReferences(structureId);
        
        comparison[structureId] = {
          objectCount: objects.objects?.length || 0,
          numericProperties: numericProps,
          references: references.totalReferences || 0
        };
      } catch (error) {
        console.warn(`Erro ao analisar estrutura ${structureId}:`, error.message);
        comparison[structureId] = { error: error.message };
      }
    }

    res.json({
      success: true,
      data: comparison,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Gerar estatísticas de propriedades selecionadas
router.post('/structure/:structureId/generate-statistics', async (req, res) => {
  try {
    const { structureId } = req.params;
    const { selectedProperties } = req.body;

    if (!selectedProperties || !Array.isArray(selectedProperties)) {
      return res.status(400).json({
        success: false,
        error: 'selectedProperties deve ser um array de IDs de propriedades'
      });
    }

    // Obter informações da estrutura
    const spaceInfo = await capacitiesAPI.getSpaceInfo();
    const structure = spaceInfo.structures?.find(s => s.id === structureId);

    if (!structure) {
      return res.status(404).json({
        success: false,
        error: 'Estrutura não encontrada'
      });
    }

    // Gerar estatísticas baseadas nas propriedades selecionadas
    const statistics = {
      structureInfo: {
        id: structure.id,
        title: structure.title,
        pluralName: structure.pluralName,
        labelColor: structure.labelColor
      },
      selectedProperties: [],
      propertyStatistics: {},
      relationships: [],
      mockData: true // Indicador de que são dados simulados
    };

    // Processar cada propriedade selecionada
    for (const propertyId of selectedProperties) {
      const property = structure.propertyDefinitions?.find(p => p.id === propertyId);
      
      if (property) {
        statistics.selectedProperties.push({
          id: property.id,
          name: property.name,
          type: property.type,
          description: property.description || ''
        });

        // Gerar estatísticas simuladas baseadas no tipo da propriedade
        switch (property.type) {
          case 'text':
          case 'richText':
          case 'entity_title':
          case 'entity_description':
            statistics.propertyStatistics[propertyId] = {
              type: 'text',
              totalEntries: Math.floor(Math.random() * 100) + 10,
              averageLength: Math.floor(Math.random() * 200) + 50,
              emptyEntries: Math.floor(Math.random() * 20),
              wordCloud: generateMockWordCloud()
            };
            break;

          case 'number':
          case 'currency':
            statistics.propertyStatistics[propertyId] = {
              type: 'numeric',
              totalEntries: Math.floor(Math.random() * 100) + 10,
              min: Math.floor(Math.random() * 100),
              max: Math.floor(Math.random() * 900) + 100,
              average: Math.floor(Math.random() * 500) + 100,
              median: Math.floor(Math.random() * 400) + 150,
              distribution: generateMockDistribution()
            };
            break;

          case 'date':
          case 'dateTime':
          case 'datetime':
          case 'entity_createdAt':
          case 'entity_lastUpdated':
            statistics.propertyStatistics[propertyId] = {
              type: 'temporal',
              totalEntries: Math.floor(Math.random() * 100) + 10,
              earliestDate: '2023-01-01',
              latestDate: '2024-12-31',
              timelineData: generateMockTimeline(),
              yearDistribution: generateMockYearDistribution()
            };
            break;

          case 'select':
          case 'multiSelect':
            statistics.propertyStatistics[propertyId] = {
              type: 'categorical',
              totalEntries: Math.floor(Math.random() * 100) + 10,
              uniqueValues: Math.floor(Math.random() * 10) + 3,
              distribution: generateMockCategoricalDistribution(property.options || []),
              topValues: generateMockTopValues()
            };
            break;

          case 'object':
          case 'entity':
          case 'entity_tags':
            statistics.propertyStatistics[propertyId] = {
              type: 'relationship',
              totalReferences: Math.floor(Math.random() * 50) + 5,
              uniqueTargets: Math.floor(Math.random() * 30) + 3,
              referencedStructures: [property.structureId || 'mixed'],
              networkData: generateMockNetworkData()
            };
            break;

          case 'blocks':
            statistics.propertyStatistics[propertyId] = {
              type: 'content',
              totalEntries: Math.floor(Math.random() * 100) + 10,
              averageBlocks: Math.floor(Math.random() * 20) + 5,
              blockTypes: ['text', 'image', 'link', 'table', 'code'],
              contentAnalysis: generateMockContentAnalysis()
            };
            break;

          case 'entity_icon':
            statistics.propertyStatistics[propertyId] = {
              type: 'icon',
              totalEntries: Math.floor(Math.random() * 100) + 10,
              uniqueIcons: Math.floor(Math.random() * 50) + 10,
              iconDistribution: generateMockIconDistribution()
            };
            break;

          default:
            statistics.propertyStatistics[propertyId] = {
              type: 'unknown',
              totalEntries: Math.floor(Math.random() * 50) + 5,
              message: 'Tipo de propriedade não suportado para estatísticas'
            };
        }
      }
    }

    // Gerar estatísticas de relacionamentos
    const allStructures = spaceInfo.structures || [];
    statistics.relationships = allStructures
      .filter(otherStruct => otherStruct.id !== structureId)
      .map(otherStruct => {
        const relationshipProperties = structure.propertyDefinitions?.filter(prop => 
          prop.type === 'object' && prop.structureId === otherStruct.id &&
          selectedProperties.includes(prop.id)
        ) || [];

        if (relationshipProperties.length > 0) {
          return {
            targetStructure: {
              id: otherStruct.id,
              title: otherStruct.title,
              labelColor: otherStruct.labelColor
            },
            properties: relationshipProperties.map(prop => prop.name),
            connectionStrength: Math.floor(Math.random() * 100),
            totalConnections: Math.floor(Math.random() * 50) + 5
          };
        }
        return null;
      })
      .filter(rel => rel !== null);

    res.json({
      success: true,
      data: statistics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao gerar estatísticas:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Funções auxiliares para gerar dados simulados
function generateMockWordCloud() {
  const words = ['capacities', 'dashboard', 'analytics', 'data', 'structure', 'property', 'analysis', 'statistics', 'visualization'];
  return words.map(word => ({
    word,
    frequency: Math.floor(Math.random() * 50) + 5
  }));
}

function generateMockDistribution() {
  return Array.from({ length: 10 }, (_, i) => ({
    range: `${i * 10}-${(i + 1) * 10}`,
    count: Math.floor(Math.random() * 20) + 1
  }));
}

function generateMockTimeline() {
  return Array.from({ length: 12 }, (_, i) => ({
    month: `2024-${String(i + 1).padStart(2, '0')}`,
    count: Math.floor(Math.random() * 30) + 1
  }));
}

function generateMockYearDistribution() {
  return [
    { year: '2022', count: Math.floor(Math.random() * 20) + 5 },
    { year: '2023', count: Math.floor(Math.random() * 40) + 10 },
    { year: '2024', count: Math.floor(Math.random() * 60) + 15 }
  ];
}

function generateMockCategoricalDistribution(options) {
  if (options.length === 0) {
    options = ['Opção A', 'Opção B', 'Opção C', 'Opção D'];
  }
  return options.slice(0, 5).map(option => ({
    value: option,
    count: Math.floor(Math.random() * 30) + 1
  }));
}

function generateMockTopValues() {
  return [
    { value: 'Valor mais comum', count: Math.floor(Math.random() * 50) + 20 },
    { value: 'Segundo mais comum', count: Math.floor(Math.random() * 40) + 15 },
    { value: 'Terceiro mais comum', count: Math.floor(Math.random() * 30) + 10 }
  ];
}

function generateMockNetworkData() {
  return {
    nodes: Math.floor(Math.random() * 20) + 5,
    edges: Math.floor(Math.random() * 40) + 10,
    clusters: Math.floor(Math.random() * 5) + 2
  };
}

// Estatísticas de coleções
router.get('/collections', async (req, res) => {
  try {
    const collections = await capacitiesAPI.getCollections();
    const collectionStats = [];
    
    for (const collection of collections.collections || []) {
      try {
        const objects = await capacitiesAPI.getCollectionObjects(collection.id, 1000);
        collectionStats.push({
          id: collection.id,
          name: collection.name,
          objectCount: objects.objects?.length || 0,
          createdAt: collection.createdAt,
          updatedAt: collection.updatedAt
        });
      } catch (error) {
        console.warn(`Erro ao obter objetos da coleção ${collection.id}:`, error.message);
      }
    }

    res.json({
      success: true,
      data: collectionStats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
