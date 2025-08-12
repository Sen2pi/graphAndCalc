const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/dashboard', dashboardRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Capacities Dashboard API'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API do Dashboard Estatístico do Capacities',
    version: '1.0.0',
    endpoints: {
      dashboard: '/api/dashboard',
      health: '/health',
      docs: 'https://docs.capacities.io/developer/api'
    },
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Dashboard disponível em: http://localhost:${PORT}/api/dashboard`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 Capacities API: https://docs.capacities.io/developer/api`);
});

// Tratamento de sinais para encerramento gracioso
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Encerrando servidor...');
  process.exit(0);
});

module.exports = app;
