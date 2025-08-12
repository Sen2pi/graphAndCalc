<div align="center">

# 🚀 StatDash

> **Transforme sua base de conhecimento em insights acionáveis**  
> Dashboard estatístico poderoso para Capacities com análise avançada, gráficos interativos e mapeamento de relacionamentos

![StatDash Logo](logo.png)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Capacities](https://img.shields.io/badge/Capacities-API-orange?style=for-the-badge)](https://capacities.io)
[![Status](https://img.shields.io/badge/Status-Production-green?style=for-the-badge)]
[![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)]

[**Demo**](https://github.com/Sen2pi/graphAndCalc) • [**Documentação**](docs/) • [**Reportar Bug**](https://github.com/Sen2pi/graphAndCalc/issues)

</div>

---

## 🎯 **O que o StatDash faz?**

O StatDash transforma seu workspace do Capacities em um **motor de insights baseado em dados**, fornecendo:

- 📊 **Analytics em Tempo Real**: Estatísticas e métricas ao vivo da sua base de conhecimento
- 🔍 **Insights Profundos**: Análise avançada de propriedades e relacionamentos de objetos
- 📈 **Visualizações Interativas**: Gráficos e tabelas lindas para exploração de dados
- ⏰ **Análise Temporal**: Entendendo como seu conhecimento evolui ao longo do tempo
- 🔗 **Mapeamento de Relacionamentos**: Descobrindo conexões entre diferentes objetos
- 📱 **Interface Moderna**: Dashboard web responsivo acessível de qualquer dispositivo

---

## ✨ **Funcionalidades Principais**

### 📊 **Analytics Core**
- **Visão Geral do Workspace**: Total de estruturas, objetos e coleções
- **Top Estruturas**: Ranking de estruturas por contagem de objetos
- **Gráficos Interativos**: Visualizações de dados com Chart.js
- **Atualizações em Tempo Real**: Refresh de dados ao vivo e monitoramento

### 🔍 **Análise Avançada**
- **Propriedades Numéricas**: Média, mediana, desvio padrão, valores min/max
- **Relacionamentos de Objetos**: Mapeamento de conexões e dependências
- **Atividade Temporal**: Análise de padrões de criação e modificação
- **Comparação de Estruturas**: Análise comparativa entre diferentes tipos

### 🔗 **Mapeamento de Relacionamentos** *(NOVO!)*
- **Diagramas Estilo MySQL**: Representação visual de relacionamentos de banco de dados
- **Mapas de Estruturas Interativos**: Clique e explore conexões de objetos
- **Relacionamentos Bidirecionais**: Rastreamento de relacionamentos de entrada e saída
- **Visualização de Propriedades**: Chaves primárias, estrangeiras e tipos de dados

### 📊 **Construtor de Estatísticas Customizadas** *(NOVO!)*
- **Tipos de Gráficos Flexíveis**: Cards de valor único, barras de progresso, gráficos XY
- **Seleção de Propriedades**: Escolha propriedades para eixos X e Y dinamicamente
- **Opções de Agregação**: Operações de contagem, soma, média, mínimo, máximo
- **Geração de Gráficos em Tempo Real**: Criação instantânea de visualizações

### 🎨 **Interface Moderna**
- **Dashboard Responsivo**: Design de interface moderno e adaptativo
- **Visualizações Interativas**: Gráficos de barras, linhas e displays estatísticos
- **Filtros Avançados**: Seleção de estrutura e filtragem por tipo de análise
- **Dados em Tempo Real**: Atualizações ao vivo e carregamento de conteúdo dinâmico

---

## 🛠️ **Stack Tecnológico**

| Categoria | Tecnologia |
|-----------|------------|
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat&logo=node.js) ![Express](https://img.shields.io/badge/Express-4.18+-black?style=flat&logo=express) |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| **Gráficos** | ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white) ![Date-fns](https://img.shields.io/badge/Date--fns-6C5CE7?style=flat) |
| **HTTP Client** | ![Axios](https://img.shields.io/badge/Axios-5C3EE8?style=flat&logo=axios) |
| **Utilitários** | ![Lodash](https://img.shields.io/badge/Lodash-3492FF?style=flat&logo=lodash) |
| **Desenvolvimento** | ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon) ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest) |

---

## 🚀 **Começar Rápido**

### **1. Clone o repositório**
```bash
git clone https://github.com/Sen2pi/graphAndCalc.git
cd graphAndCalc
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite .env com suas credenciais
CAPACITIES_API_TOKEN=seu_token_de_acesso_aqui
CAPACITIES_SPACE_ID=seu_space_id_aqui
CAPACITIES_API_BASE_URL=https://api.capacities.io
PORT=3000
```

### **4. Inicie o servidor**
```bash
npm start
```

### **5. Acesse o dashboard**
Abra seu navegador em `http://localhost:3000` 🎉

---

## 🎯 **Guia de Uso Rápido**

### **📊 Visualizando Diagramas de Relacionamento**
1. Inicie o servidor: `npm start`
2. Abra seu navegador em `http://localhost:3000`
3. Selecione uma estrutura no dropdown
4. Clique em "Load Diagram" na seção "Relationship Diagram"
5. Explore a representação visual dos relacionamentos de objetos

### **📈 Criando Gráficos Customizados**
1. Selecione uma estrutura no dashboard
2. Escolha seu tipo de gráfico (valor único, progresso, barras, linha, etc.)
3. Selecione propriedades para os eixos X e Y
4. Escolha o método de agregação (contagem, soma, média, etc.)
5. Clique em "Generate Chart" para criar sua visualização

### **🔍 Entendendo a Interface**
- **Relationship Diagram**: Mostra como as estruturas se conectam entre si
- **Custom Statistics Builder**: Crie gráficos baseados em suas necessidades específicas
- **Property Selection**: Escolha entre propriedades de objetos disponíveis
- **Real-time Generation**: Gráficos atualizam instantaneamente com suas seleções

---

## 📋 **Pré-requisitos**

- **Node.js** 18+ 
- **Token de Acesso da API Capacities**
- **ID do Space Capacities**
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)

---

## 🔑 **Configuração da API**

### **📱 Obtendo seu Token de API**

1. Abra a aplicação desktop do Capacities
2. Navegue para `Settings` > `Capacities API`
3. Gere um novo token de acesso
4. **⚠️ Importante**: Mantenha este token seguro e nunca o compartilhe

### **🏠 Obtendo seu Space ID**

1. Na aplicação Capacities, vá para `Settings` > `Space settings`
2. O Space ID será exibido na seção de configurações

---

## 📡 **Endpoints da API**

### 🎯 **Dashboard Core**
| Endpoint | Método | Descrição |
|-----------|--------|-----------|
| `/api/dashboard` | `GET` | Relatório completo de análise |
| `/api/dashboard/space-stats` | `GET` | Estatísticas gerais do workspace |

### 🔍 **Análise de Estruturas**
| Endpoint | Método | Descrição |
|-----------|--------|-----------|
| `/api/dashboard/structure/:id` | `GET` | Análise completa da estrutura |
| `/api/dashboard/structure/:id/numeric-properties` | `GET` | Análise de propriedades numéricas |
| `/api/dashboard/structure/:id/references` | `GET` | Análise de referências de objetos |
| `/api/dashboard/structure/:id/temporal` | `GET` | Análise de atividade temporal |

### 🔗 **Relacionamentos e Estatísticas Customizadas** *(NOVO!)*
| Endpoint | Método | Descrição |
|-----------|--------|-----------|
| `/api/dashboard/structure/:id/relationship-diagram` | `GET` | Diagrama de relacionamentos estilo MySQL |
| `/api/dashboard/structure/:id/custom-chart` | `POST` | Geração de gráficos customizados |

### 🔄 **Comparação e Coleções**
| Endpoint | Método | Descrição |
|-----------|--------|-----------|
| `/api/dashboard/compare` | `GET` | Comparar múltiplas estruturas |
| `/api/dashboard/collections` | `GET` | Estatísticas de coleções |

### 🛠️ **Utilitários**
| Endpoint | Método | Descrição |
|-----------|--------|-----------|
| `/health` | `GET` | Verificação de saúde da API |
| `/` | `GET` | Informações da API |

---

## 🌐 **Interface Web**

Acesse `http://localhost:3000` para usar a interface web completa.

### 🎨 **Recursos da Interface**
- **Dashboard Principal**: Visão geral com estatísticas e gráficos
- **Seleção de Estruturas**: Dropdown com todas as estruturas disponíveis
- **Tipos de Análise**: Escolha entre diferentes tipos de análise
- **Gráficos Interativos**: Visualizações responsivas e interativas
- **Tabelas Detalhadas**: Dados organizados em tabelas para análise detalhada

---

## 📊 **Tipos de Análise**

### 1️⃣ **Análise de Visão Geral**
- Contagem total de objetos
- Número de propriedades numéricas
- Total de referências
- Eventos temporais

### 2️⃣ **Propriedades Numéricas**
- **Estatísticas Descritivas**: Média, mediana, moda
- **Medidas de Dispersão**: Desvio padrão, variância
- **Valores Extremos**: Mínimo e máximo
- **Análise de Contagem**: Número de objetos por propriedade

### 3️⃣ **Referências de Objetos**
- **Mapeamento de Conexões**: Quais objetos referenciam outros
- **Contagem de Referências**: Frequência de cada tipo de referência
- **Análise de Dependências**: Objetos mais referenciados

### 4️⃣ **Atividade Temporal**
- **Criação de Objetos**: Padrões de criação ao longo do tempo
- **Modificações**: Análise de frequência de atualizações
- **Análise Sazonal**: Padrões diários, semanais, mensais

---

## 🔧 **Desenvolvimento**

### 📁 **Estrutura do Projeto**
```
graphAndCalc/
├── 📁 src/
│   ├── 📁 config/
│   │   └── 📄 capacities.js      # Configuração da API Capacities
│   ├── 📁 services/
│   │   └── 📄 analytics.js       # Serviço de análise de dados
│   ├── 📁 routes/
│   │   └── 📄 dashboard.js       # Rotas da API
│   └── 📄 index.js               # Servidor principal
├── 📁 public/
│   └── 📄 index.html             # Interface web
├── 📁 docs/
│   └── 📄 dashboard-improvements.md  # Documentação das melhorias
├── 📁 examples/
│   └── 📄 example-usage.js       # Exemplos de uso
├── 📄 env.example                # Template de variáveis de ambiente
├── 📄 package.json               # Dependências e scripts
├── 📄 README.md                  # Esta documentação
└── 🖼️ logo.png                   # Logo do projeto
```

### 🚀 **Scripts Disponíveis**
```bash
npm start          # Iniciar o servidor
npm run dev        # Iniciar em modo desenvolvimento com nodemon
npm test           # Executar testes
npm run example    # Executar exemplos de uso
```

### ➕ **Adicionando Novas Funcionalidades**

1. **Novos endpoints**: Adicione em `src/routes/dashboard.js`
2. **Novas análises**: Implemente em `src/services/analytics.js`
3. **Novos gráficos**: Adicione na interface web em `public/index.html`

---

## 📈 **Exemplos de Uso**

### 🔍 **Análise de Estrutura**
```bash
curl "http://localhost:3000/api/dashboard/structure/RootPage/numeric-properties" \
  -H "Authorization: Bearer your_token"
```

### 🔄 **Comparação de Estruturas**
```bash
curl "http://localhost:3000/api/dashboard/compare?structureIds[]=RootPage&structureIds[]=RootDatabase" \
  -H "Authorization: Bearer your_token"
```

### 📊 **Estatísticas Gerais**
```bash
curl "http://localhost:3000/api/dashboard/space-stats" \
  -H "Authorization: Bearer your_token"
```

### 🚀 **Executar Script de Exemplos**
```bash
npm run example
```

---

## 🚨 **Limitações e Considerações**

### ⏱️ **Rate Limiting**
- A API do Capacities tem limites de taxa
- Implemente retry com backoff exponencial para requisições
- Monitore os headers `RateLimit-Remaining` e `RateLimit-Reset`

### 📈 **Dados em Grande Escala**
- Para workspaces com muitos objetos, considere implementar paginação
- Cache resultados para melhorar performance
- Análise em background para relatórios complexos

### 🔒 **Segurança**
- **NUNCA** exponha seu token de API no frontend
- Use HTTPS em produção
- Implemente autenticação se necessário

---

## 🐛 **Solução de Problemas**

### 🔐 **Erro de Autenticação**
```
Error: CAPACITIES_API_TOKEN is required in .env file
```
**Solução**: Verifique se o arquivo `.env` existe e contém o token correto.

### 🔌 **Erro de Conexão**
```
Error: connect ECONNREFUSED
```
**Solução**: Verifique se a API do Capacities está acessível e se o token é válido.

### 📊 **Dados Não Carregando**
**Solução**: 
1. Verifique o console do navegador para erros
2. Confirme se o servidor está rodando
3. Verifique as permissões do token de API

---

## 🤝 **Contribuindo**

Aceitamos contribuições! Aqui está como você pode ajudar:

1. **Fork** o projeto
2. **Crie** uma branch de feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### 🎯 **Áreas para Contribuição**
- Novos tipos de análise
- Visualizações adicionais de gráficos
- Melhorias de performance
- Aprimoramentos de documentação
- Correções de bugs e testes

---

## 📄 **Licença**

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🔗 **Links Úteis**

- [📚 Documentação da API Capacities](https://docs.capacities.io/developer/api)
- [🌐 Website do Capacities](https://capacities.io)
- [📊 Documentação do Chart.js](https://www.chartjs.org/docs/)
- [⚡ Documentação do Express.js](https://expressjs.com/)

---

## 📞 **Suporte**

Se você encontrar problemas ou tiver perguntas:

1. **Verifique** esta documentação
2. **Revise** os logs do servidor
3. **Abra** uma issue no repositório
4. **Entre em contato** com a equipe de desenvolvimento

---

## 🚀 **Começando Rápido**

```bash
# Clone e configure
git clone https://github.com/Sen2pi/graphAndCalc.git
cd graphAndCalc
npm install

# Configure seu ambiente
cp env.example .env
# Edite .env com suas credenciais do Capacities

# Inicie o StatDash
npm start
```

Então visite `http://localhost:3000` para acessar seu dashboard! 🎉

---

<div align="center">

**Construído com ❤️ para a comunidade Capacities**

[![GitHub stars](https://img.shields.io/github/stars/Sen2pi/graphAndCalc?style=social)](https://github.com/Sen2pi/graphAndCalc)
[![GitHub forks](https://img.shields.io/badge/GitHub-Forks-blue?style=social)](https://github.com/Sen2pi/graphAndCalc)
[![GitHub issues](https://img.shields.io/github/issues/Sen2pi/graphAndCalc)](https://github.com/Sen2pi/graphAndCalc/issues)

</div>
