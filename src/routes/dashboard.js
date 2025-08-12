const express = require('express');
const router = express.Router();
const CapacitiesAPI = require('../config/capacities');
const AnalyticsService = require('../services/analytics');

const capacitiesAPI = new CapacitiesAPI();
const analyticsService = new AnalyticsService(capacitiesAPI);

// Rota principal do dashboard
router.get('/', async (req, res) => {
  try {
    const report = await analyticsService.generateFullReport();
    res.json({
      success: true,
      data: report,
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

// Análise de uma estrutura específica
router.get('/structure/:structureId', async (req, res) => {
  try {
    const { structureId } = req.params;
    
    const analysis = {
      basic: null,
      numericProperties: {},
      references: {},
      temporal: {}
    };

    try {
      // Obter informações básicas da estrutura
      const spaceInfo = await capacitiesAPI.getSpaceInfo();
      const structure = spaceInfo.structures?.find(s => s.id === structureId);
      
      if (structure) {
        const objects = await capacitiesAPI.getObjectsByStructure(structureId, 1000);
        analysis.basic = {
          ...structure,
          objectCount: objects.objects?.length || 0
        };
      }

      // Análise de propriedades numéricas
      analysis.numericProperties = await analyticsService.analyzeNumericProperties(structureId);
      
      // Análise de referências
      analysis.references = await analyticsService.analyzeObjectReferences(structureId);
      
      // Análise temporal
      analysis.temporal = await analyticsService.analyzeTemporalActivity(structureId);
      
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
