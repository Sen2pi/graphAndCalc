#!/usr/bin/env node

require('dotenv').config();

console.log('🧪 StatDash Configuration Test');
console.log('==============================\n');

// Check environment variables
const requiredVars = [
  'CAPACITIES_API_TOKEN',
  'CAPACITIES_SPACE_ID',
  'CAPACITIES_API_BASE_URL'
];

let configValid = true;

console.log('📋 Environment Variables Check:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== 'your_access_token_here' && value !== 'your_space_id_here') {
    console.log(`   ✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`   ❌ ${varName}: ${value || 'NOT SET'}`);
    configValid = false;
  }
});

console.log('\n🔧 Configuration Status:');
if (configValid) {
  console.log('   ✅ All required variables are configured');
} else {
  console.log('   ❌ Some required variables are missing or have default values');
  console.log('\n💡 To fix this:');
  console.log('   1. Copy env.example to .env: cp env.example .env');
  console.log('   2. Edit .env with your real credentials');
  console.log('   3. Restart the application');
  process.exit(1);
}

// Test API connection
console.log('\n🌐 Testing API Connection...');
const axios = require('axios');

const testAPI = async () => {
  try {
    const token = process.env.CAPACITIES_API_TOKEN;
    const baseURL = process.env.CAPACITIES_API_BASE_URL;
    
    console.log(`   📍 Testing: ${baseURL}/space-info?spaceid=${process.env.CAPACITIES_SPACE_ID}`);
    
    const response = await axios.get(`${baseURL}/space-info`, {
      params: { spaceid: process.env.CAPACITIES_SPACE_ID }
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('   ✅ API connection successful!');
    console.log(`   📊 Response status: ${response.status}`);
    
    if (response.data) {
      console.log(`   🏗️  Structures found: ${response.data.structures?.length || 0}`);
    }
    
  } catch (error) {
    console.log('   ❌ API connection failed:');
    
    if (error.response) {
      console.log(`      Status: ${error.response.status}`);
      console.log(`      Message: ${error.response.data?.message || 'No message'}`);
      console.log(`      Details: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.request) {
      console.log(`      Error: No response received (${error.message})`);
    } else {
      console.log(`      Error: ${error.message}`);
    }
    
    console.log('\n🔍 Troubleshooting tips:');
    console.log('   1. Verify your API token is valid and not expired');
    console.log('   2. Check if the Capacities API is accessible');
    console.log('   3. Ensure your token has the necessary permissions');
    console.log('   4. Try regenerating your API token in Capacities');
  }
};

testAPI();
