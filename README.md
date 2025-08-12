# StatDash 📊

> **A powerful statistical dashboard extension for Capacities**  
> Transform your knowledge base into actionable insights with advanced analytics, interactive charts, and comprehensive data analysis.

![StatDash Logo](logo.png)

*StatDash provides deep analytics for your Capacities workspace, offering statistical insights, object relationship mapping, and temporal analysis through an intuitive web interface.*

## ✨ Features

### 📊 **Core Analytics**
- **Workspace Overview**: Total structures, objects, and collections
- **Top Structures**: Ranking of structures by object count
- **Interactive Charts**: Data visualizations powered by Chart.js
- **Real-time Updates**: Live data refresh and monitoring

### 🔍 **Advanced Analysis**
- **Numeric Properties**: Mean, median, standard deviation, min/max values
- **Object Relationships**: Mapping connections and dependencies
- **Temporal Activity**: Creation and modification pattern analysis
- **Structure Comparison**: Comparative analysis across different types

### 🎨 **Modern Interface**
- **Responsive Dashboard**: Modern, adaptive interface design
- **Interactive Visualizations**: Bar charts, line graphs, and statistical displays
- **Advanced Filtering**: Structure selection and analysis type filtering
- **Real-time Data**: Live updates and dynamic content loading

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Node.js + Express |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Charts** | Chart.js + Chart.js Adapter Date-fns |
| **HTTP Client** | Axios |
| **Utilities** | Lodash, Date-fns |
| **Development** | Nodemon, Jest |

## 📋 Prerequisites

- **Node.js** 16+ 
- **Capacities API Access Token**
- **Capacities Space ID**
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## ⚙️ Installation

### 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Sen2pi/graphAndCalc.git
cd graphAndCalc
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example file
cp env.example .env

# Edit .env with your credentials
CAPACITIES_API_TOKEN=your_access_token_here
CAPACITIES_SPACE_ID=your_space_id_here
CAPACITIES_API_BASE_URL=https://api.capacities.io
PORT=3000
```

4. **Start the server**
```bash
npm start
```

### 🔧 Development Mode
```bash
npm run dev
```

## 🔑 API Setup

### 📱 Getting Your API Token

1. Open the Capacities desktop application
2. Navigate to `Settings` > `Capacities API`
3. Generate a new access token
4. **⚠️ Important**: Keep this token secure and never share it

### 🏠 Getting Your Space ID

1. In the Capacities app, go to `Settings` > `Space settings`
2. The Space ID will be displayed in the settings section

## 📡 API Endpoints

### 🎯 **Core Dashboard**
| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/dashboard` | `GET` | Complete analysis report |
| `/api/dashboard/space-stats` | `GET` | General workspace statistics |

### 🔍 **Structure Analysis**
| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/dashboard/structure/:id` | `GET` | Complete structure analysis |
| `/api/dashboard/structure/:id/numeric-properties` | `GET` | Numeric properties analysis |
| `/api/dashboard/structure/:id/references` | `GET` | Object references analysis |
| `/api/dashboard/structure/:id/temporal` | `GET` | Temporal activity analysis |

### 🔄 **Comparison & Collections**
| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/dashboard/compare` | `GET` | Compare multiple structures |
| `/api/dashboard/collections` | `GET` | Collection statistics |

### 🛠️ **Utilities**
| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/health` | `GET` | API health check |
| `/` | `GET` | API information |

## 🌐 Web Interface

Access `http://localhost:3000/index.html` to use the complete web interface.

### 🎨 **Interface Features**
- **Main Dashboard**: Overview with statistics and charts
- **Structure Selection**: Dropdown with all available structures
- **Analysis Types**: Choose between different analysis types
- **Interactive Charts**: Responsive and interactive visualizations
- **Detailed Tables**: Data organized in tables for detailed analysis

## 📊 Analysis Types

### 1️⃣ **Overview Analysis**
- Total object count
- Number of numeric properties
- Total references
- Temporal events

### 2️⃣ **Numeric Properties**
- **Descriptive Statistics**: Mean, median, mode
- **Dispersion Measures**: Standard deviation, variance
- **Extreme Values**: Minimum and maximum
- **Count Analysis**: Number of objects per property

### 3️⃣ **Object References**
- **Connection Mapping**: Which objects reference others
- **Reference Counting**: Frequency of each reference type
- **Dependency Analysis**: Most referenced objects

### 4️⃣ **Temporal Activity**
- **Object Creation**: Creation patterns over time
- **Modifications**: Update frequency analysis
- **Seasonal Analysis**: Daily, weekly, monthly patterns

## 🔧 Development

### 📁 **Project Structure**
```
src/
├── config/
│   └── capacities.js      # Capacities API configuration
├── services/
│   └── analytics.js       # Data analysis service
├── routes/
│   └── dashboard.js       # API routes
└── index.js               # Main server

public/
└── index.html             # Web interface

examples/
└── example-usage.js       # Usage examples

env.example                # Environment variables template
package.json               # Dependencies and scripts
README.md                  # This documentation
```

### 🚀 **Available Scripts**
```bash
npm start          # Start the server
npm run dev        # Start in development mode with nodemon
npm test           # Run tests
npm run example    # Run usage examples
```

### ➕ **Adding New Features**

1. **New endpoints**: Add to `src/routes/dashboard.js`
2. **New analyses**: Implement in `src/services/analytics.js`
3. **New charts**: Add to web interface in `public/index.html`

## 📈 Usage Examples

### 🔍 **Structure Analysis**
```bash
curl "http://localhost:3000/api/dashboard/structure/RootPage/numeric-properties" \
  -H "Authorization: Bearer your_token"
```

### 🔄 **Structure Comparison**
```bash
curl "http://localhost:3000/api/dashboard/compare?structureIds[]=RootPage&structureIds[]=RootDatabase" \
  -H "Authorization: Bearer your_token"
```

### 📊 **General Statistics**
```bash
curl "http://localhost:3000/api/dashboard/space-stats" \
  -H "Authorization: Bearer your_token"
```

### 🚀 **Run Examples Script**
```bash
npm run example
```

## 🚨 Limitações e Considerações

### Rate Limiting
- A API do Capacities possui limites de taxa
- Implemente retry com backoff exponencial para requisições
- Monitore os headers `RateLimit-Remaining` e `RateLimit-Reset`

### Dados em Larga Escala
- Para espaços com muitos objetos, considere implementar paginação
- Cache de resultados para melhorar performance
- Análises em background para relatórios complexos

### Segurança
- **NUNCA** exponha seu token da API no frontend
- Use HTTPS em produção
- Implemente autenticação se necessário

## 🐛 Troubleshooting

### Erro de Autenticação
```
Error: CAPACITIES_API_TOKEN é obrigatório no arquivo .env
```
**Solução**: Verifique se o arquivo `.env` existe e contém o token correto.

### Erro de Conexão
```
Error: connect ECONNREFUSED
```
**Solução**: Verifique se a API do Capacities está acessível e se o token é válido.

### Dados Não Carregam
**Solução**: 
1. Verifique o console do navegador para erros
2. Confirme se o servidor está rodando
3. Verifique as permissões do token da API

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links Úteis

- [Documentação da API Capacities](https://docs.capacities.io/developer/api)
- [Capacities Website](https://capacities.io)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique esta documentação
2. Consulte os logs do servidor
3. Abra uma issue no repositório
4. Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para a comunidade Capacities**
