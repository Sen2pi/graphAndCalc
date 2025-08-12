const axios = require('axios');

// Configuração
const BASE_URL = 'http://localhost:3000/api/dashboard';
const API_TOKEN = process.env.CAPACITIES_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ CAPACITIES_API_TOKEN não configurado no ambiente');
  console.log('Configure a variável de ambiente ou crie um arquivo .env');
  process.exit(1);
}

// Cliente HTTP configurado
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Funções de exemplo
async function exemploDashboardCompleto() {
  console.log('\n📊 1. Dashboard Completo');
  console.log('========================');
  
  try {
    const response = await client.get('/');
    const data = response.data;
    
    console.log(`✅ Status: ${data.success}`);
    console.log(`📈 Total de Estruturas: ${data.data.space.totalStructures}`);
    console.log(`🔢 Total de Objetos: ${data.data.space.totalObjects}`);
    console.log(`🏆 Top Estrutura: ${data.data.space.topStructures[0]?.[1]?.name || 'N/A'}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

async function exemploEstatisticasEspaco() {
  console.log('\n📈 2. Estatísticas do Espaço');
  console.log('==============================');
  
  try {
    const response = await client.get('/space-stats');
    const data = response.data;
    
    console.log(`✅ Status: ${data.success}`);
    console.log(`🏗️  Estruturas: ${data.data.totalStructures}`);
    console.log(`📦 Objetos: ${data.data.totalObjects}`);
    console.log(`📚 Coleções: ${data.data.totalCollections || 0}`);
    
    // Mostrar top 3 estruturas
    console.log('\n🏆 Top 3 Estruturas:');
    data.data.topStructures.slice(0, 3).forEach(([id, structure], index) => {
      console.log(`   ${index + 1}. ${structure.name}: ${structure.count} objetos`);
    });
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

async function exemploAnaliseEstrutura() {
  console.log('\n🔍 3. Análise de Estrutura Específica');
  console.log('=====================================');
  
  try {
    // Primeiro, obter informações do espaço para pegar um ID de estrutura
    const spaceResponse = await client.get('/space-stats');
    const spaceData = spaceResponse.data;
    
    if (!spaceData.success || !spaceData.data.topStructures.length) {
      console.log('❌ Nenhuma estrutura disponível para análise');
      return;
    }
    
    const structureId = spaceData.data.topStructures[0][0];
    const structureName = spaceData.data.topStructures[0][1].name;
    
    console.log(`📊 Analisando estrutura: ${structureName} (${structureId})`);
    
    // Análise completa da estrutura
    const analysisResponse = await client.get(`/structure/${structureId}`);
    const analysisData = analysisResponse.data;
    
    if (analysisData.success) {
      console.log(`✅ Análise concluída`);
      console.log(`   📊 Objetos: ${analysisData.data.basic?.objectCount || 0}`);
      console.log(`   🔢 Propriedades numéricas: ${Object.keys(analysisData.data.numericProperties || {}).length}`);
      console.log(`   🔗 Referências: ${analysisData.data.references?.totalReferences || 0}`);
      console.log(`   ⏰ Eventos temporais: ${analysisData.data.temporal?.total || 0}`);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

async function exemploPropriedadesNumericas() {
  console.log('\n🔢 4. Análise de Propriedades Numéricas');
  console.log('========================================');
  
  try {
    // Obter uma estrutura com propriedades numéricas
    const spaceResponse = await client.get('/space-stats');
    const spaceData = spaceResponse.data;
    
    if (!spaceData.success || !spaceData.data.topStructures.length) {
      console.log('❌ Nenhuma estrutura disponível');
      return;
    }
    
    const structureId = spaceData.data.topStructures[0][0];
    const structureName = spaceData.data.topStructures[0][1].name;
    
    console.log(`📊 Analisando propriedades de: ${structureName}`);
    
    const response = await client.get(`/structure/${structureId}/numeric-properties`);
    const data = response.data;
    
    if (data.success && Object.keys(data.data).length > 0) {
      console.log(`✅ Propriedades numéricas encontradas: ${Object.keys(data.data).length}`);
      
      // Mostrar detalhes da primeira propriedade
      const firstProperty = Object.entries(data.data)[0];
      const [propName, stats] = firstProperty;
      
      console.log(`\n📊 Exemplo - Propriedade: ${propName}`);
      console.log(`   📈 Média: ${stats.average.toFixed(2)}`);
      console.log(`   📊 Mediana: ${stats.median.toFixed(2)}`);
      console.log(`   📉 Mínimo: ${stats.min}`);
      console.log(`   📈 Máximo: ${stats.max}`);
      console.log(`   📐 Desvio Padrão: ${stats.standardDeviation.toFixed(2)}`);
    } else {
      console.log('ℹ️  Nenhuma propriedade numérica encontrada');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

async function exemploReferencias() {
  console.log('\n🔗 5. Análise de Referências');
  console.log('============================');
  
  try {
    const spaceResponse = await client.get('/space-stats');
    const spaceData = spaceResponse.data;
    
    if (!spaceData.success || !spaceData.data.topStructures.length) {
      console.log('❌ Nenhuma estrutura disponível');
      return;
    }
    
    const structureId = spaceData.data.topStructures[0][0];
    const structureName = spaceData.data.topStructures[0][1].name;
    
    console.log(`🔍 Analisando referências de: ${structureName}`);
    
    const response = await client.get(`/structure/${structureId}/references`);
    const data = response.data;
    
    if (data.success) {
      console.log(`✅ Análise de referências concluída`);
      console.log(`   🔗 Total de referências: ${data.data.totalReferences || 0}`);
      console.log(`   📊 Propriedades com referências: ${Object.keys(data.data.references || {}).length}`);
      
      if (data.data.references && Object.keys(data.data.references).length > 0) {
        console.log(`\n📋 Propriedades com referências:`);
        Object.entries(data.data.references).forEach(([property, refs]) => {
          const totalRefs = Object.values(refs).reduce((sum, count) => sum + count, 0);
          console.log(`   • ${property}: ${totalRefs} referências`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

async function exemploAtividadeTemporal() {
  console.log('\n⏰ 6. Análise de Atividade Temporal');
  console.log('===================================');
  
  try {
    const spaceResponse = await client.get('/space-stats');
    const spaceData = spaceResponse.data;
    
    if (!spaceData.success || !spaceData.data.topStructures.length) {
      console.log('❌ Nenhuma estrutura disponível');
      return;
    }
    
    const structureId = spaceData.data.topStructures[0][0];
    const structureName = spaceData.data.topStructures[0][1].name;
    
    console.log(`⏰ Analisando atividade temporal de: ${structureName}`);
    
    const response = await client.get(`/structure/${structureId}/temporal`);
    const data = response.data;
    
    if (data.success) {
      console.log(`✅ Análise temporal concluída`);
      console.log(`   📅 Total de eventos: ${data.data.total || 0}`);
      console.log(`   📊 Dias com atividade: ${data.data.daily?.length || 0}`);
      console.log(`   📈 Semanas com atividade: ${data.data.weekly?.length || 0}`);
      
      if (data.data.daily && data.data.daily.length > 0) {
        const recentDays = data.data.daily.slice(-5);
        console.log(`\n📅 Últimos 5 dias com atividade:`);
        recentDays.forEach(day => {
          console.log(`   • ${day.date}: ${day.count} eventos`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

async function exemploComparacaoEstruturas() {
  console.log('\n🔄 7. Comparação entre Estruturas');
  console.log('==================================');
  
  try {
    const spaceResponse = await client.get('/space-stats');
    const spaceData = spaceResponse.data;
    
    if (!spaceData.success || spaceData.data.topStructures.length < 2) {
      console.log('❌ É necessário pelo menos 2 estruturas para comparação');
      return;
    }
    
    const structure1 = spaceData.data.topStructures[0][0];
    const structure2 = spaceData.data.topStructures[1][0];
    
    console.log(`🔄 Comparando estruturas...`);
    
    const response = await client.get('/compare', {
      params: {
        structureIds: [structure1, structure2]
      }
    });
    
    const data = response.data;
    
    if (data.success) {
      console.log(`✅ Comparação concluída`);
      
      Object.entries(data.data).forEach(([id, info]) => {
        if (info.error) {
          console.log(`   ❌ ${id}: Erro - ${info.error}`);
        } else {
          const structure = spaceData.data.structures[id];
          console.log(`   📊 ${structure?.name || id}:`);
          console.log(`      • Objetos: ${info.objectCount}`);
          console.log(`      • Propriedades numéricas: ${Object.keys(info.numericProperties || {}).length}`);
          console.log(`      • Referências: ${info.references}`);
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

async function exemploColecoes() {
  console.log('\n📚 8. Estatísticas de Coleções');
  console.log('===============================');
  
  try {
    const response = await client.get('/collections');
    const data = response.data;
    
    if (data.success) {
      console.log(`✅ Estatísticas de coleções obtidas`);
      console.log(`   📚 Total de coleções: ${data.data.length}`);
      
      if (data.data.length > 0) {
        console.log(`\n📋 Detalhes das coleções:`);
        data.data.slice(0, 5).forEach((collection, index) => {
          console.log(`   ${index + 1}. ${collection.name}:`);
          console.log(`      • ID: ${collection.id}`);
          console.log(`      • Objetos: ${collection.objectCount}`);
          console.log(`      • Criada: ${collection.createdAt ? new Date(collection.createdAt).toLocaleDateString('pt-BR') : 'N/A'}`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data?.error || error.message);
  }
}

// Função principal
async function executarExemplos() {
  console.log('🚀 Iniciando exemplos de uso da API do Dashboard Capacities');
  console.log('================================================================');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`🔑 Token configurado: ${API_TOKEN ? '✅ Sim' : '❌ Não'}`);
  
  try {
    await exemploDashboardCompleto();
    await exemploEstatisticasEspaco();
    await exemploAnaliseEstrutura();
    await exemploPropriedadesNumericas();
    await exemploReferencias();
    await exemploAtividadeTemporal();
    await exemploComparacaoEstruturas();
    await exemploColecoes();
    
    console.log('\n🎉 Todos os exemplos executados com sucesso!');
    console.log('\n💡 Dica: Use a interface web em http://localhost:3000/index.html para uma experiência visual completa.');
    
  } catch (error) {
    console.error('\n💥 Erro durante execução dos exemplos:', error.message);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  executarExemplos();
}

module.exports = {
  executarExemplos,
  exemploDashboardCompleto,
  exemploEstatisticasEspaco,
  exemploAnaliseEstrutura,
  exemploPropriedadesNumericas,
  exemploReferencias,
  exemploAtividadeTemporal,
  exemploComparacaoEstruturas,
  exemploColecoes
};
