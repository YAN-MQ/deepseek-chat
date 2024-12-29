const express = require('express');
const axios = require('axios');
const config = require('../config');

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    console.log('收到请求:', req.body);

    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: req.body.messages,
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Authorization': `Bearer ${config.deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API 响应:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('错误详情:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({
      error: '服务器错误',
      details: error.response?.data || error.message,
      status: error.response?.status
    });
  }
});

router.get('/test', (req, res) => {
  res.json({ message: '聊天路由正常工作' });
});

module.exports = router; 