const express = require('express');
const axios = require('axios');
const config = require('../config');

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: "deepseek-chat",
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({
      error: '抱歉，发生了一些错误，请稍后再试。',
      details: error.response?.data || error.message
    });
  }
});

router.get('/test', (req, res) => {
  res.json({ message: '聊天路由正常工作' });
});

module.exports = router; 