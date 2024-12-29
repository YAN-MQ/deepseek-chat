require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY
}; 