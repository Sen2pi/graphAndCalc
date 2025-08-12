const axios = require('axios');
require('dotenv').config();

class CapacitiesAPI {
  constructor() {
    this.apiToken = process.env.CAPACITIES_API_TOKEN;
    this.spaceId = process.env.CAPACITIES_SPACE_ID;
    this.baseURL = process.env.CAPACITIES_API_BASE_URL || 'https://api.capacities.io';
    
    if (!this.apiToken) {
      throw new Error('CAPACITIES_API_TOKEN é obrigatório no arquivo .env');
    }
    
    if (!this.spaceId) {
      throw new Error('CAPACITIES_SPACE_ID é obrigatório no arquivo .env');
    }
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Obter informações do espaço
  async getSpaceInfo() {
    try {
      const response = await this.client.get(`/space-info`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter informações do espaço:', error.message);
      throw error;
    }
  }

  // Obter todos os objetos de uma estrutura específica
  async getObjectsByStructure(structureId, limit = 100) {
    try {
      const response = await this.client.get(`/objects`, {
        params: {
          structureId,
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter objetos da estrutura ${structureId}:`, error.message);
      throw error;
    }
  }

  // Obter um objeto específico por ID
  async getObject(objectId) {
    try {
      const response = await this.client.get(`/objects/${objectId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter objeto ${objectId}:`, error.message);
      throw error;
    }
  }

  // Obter objetos com filtros específicos
  async searchObjects(query, structureId = null, limit = 100) {
    try {
      const params = { query, limit };
      if (structureId) params.structureId = structureId;
      
      const response = await this.client.get(`/objects/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Erro na pesquisa de objetos:', error.message);
      throw error;
    }
  }

  // Obter coleções
  async getCollections() {
    try {
      const response = await this.client.get(`/collections`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter coleções:', error.message);
      throw error;
    }
  }

  // Obter objetos de uma coleção
  async getCollectionObjects(collectionId, limit = 100) {
    try {
      const response = await this.client.get(`/collections/${collectionId}/objects`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter objetos da coleção ${collectionId}:`, error.message);
      throw error;
    }
  }
}

module.exports = CapacitiesAPI;
