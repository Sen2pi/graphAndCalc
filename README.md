# StatDash 📊

> **A powerful statistical dashboard extension for Capacities**  
> Transform your knowledge base into actionable insights with advanced analytics, interactive charts, and comprehensive data analysis.

![StatDash Logo](logo.png)

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Capacities](https://img.shields.io/badge/Capacities-API-orange.svg)](https://capacities.io)
[![Status](https://img.shields.io/badge/Status-Beta-yellow.svg)](https://github.com/Sen2pi/graphAndCalc)

*StatDash provides deep analytics for your Capacities workspace, offering statistical insights, object relationship mapping, and temporal analysis through an intuitive web interface.*

---

## 🎯 **What StatDash Does**

StatDash transforms your Capacities workspace into a **data-driven insights engine** by providing:

- 📊 **Real-time Analytics**: Live statistics and metrics from your knowledge base
- 🔍 **Deep Insights**: Advanced analysis of object properties and relationships  
- 📈 **Interactive Visualizations**: Beautiful charts and graphs for data exploration
- ⏰ **Temporal Analysis**: Understanding how your knowledge evolves over time
- 🔗 **Relationship Mapping**: Discovering connections between different objects
- 📱 **Modern Interface**: Responsive web dashboard accessible from any device

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

## 🚨 Limitations & Considerations

### ⏱️ **Rate Limiting**
- The Capacities API has rate limits
- Implement retry with exponential backoff for requests
- Monitor `RateLimit-Remaining` and `RateLimit-Reset` headers

### 📈 **Large Scale Data**
- For workspaces with many objects, consider implementing pagination
- Cache results to improve performance
- Background analysis for complex reports

### 🔒 **Security**
- **NEVER** expose your API token in the frontend
- Use HTTPS in production
- Implement authentication if necessary

## 🐛 Troubleshooting

### 🔐 **Authentication Error**
```
Error: CAPACITIES_API_TOKEN is required in .env file
```
**Solution**: Verify that the `.env` file exists and contains the correct token.

### 🔌 **Connection Error**
```
Error: connect ECONNREFUSED
```
**Solution**: Check if the Capacities API is accessible and if the token is valid.

### 📊 **Data Not Loading**
**Solution**: 
1. Check browser console for errors
2. Confirm the server is running
3. Verify API token permissions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the project
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 🎯 **Areas for Contribution**
- New analysis types
- Additional chart visualizations
- Performance improvements
- Documentation enhancements
- Bug fixes and testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Capacities API Documentation](https://docs.capacities.io/developer/api)
- [Capacities Website](https://capacities.io)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)

## 📞 Support

If you encounter issues or have questions:

1. **Check** this documentation
2. **Review** server logs
3. **Open** an issue in the repository
4. **Contact** the development team

## 🚀 **Getting Started Quick**

```bash
# Clone and setup
git clone https://github.com/Sen2pi/graphAndCalc.git
cd graphAndCalc
npm install

# Configure your environment
cp env.example .env
# Edit .env with your Capacities credentials

# Start StatDash
npm start
```

Then visit `http://localhost:3000/index.html` to access your dashboard!

---

**Built with ❤️ for the Capacities community**
