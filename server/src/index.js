const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const config = require('./config');

const app = express();

// 添加自定义中间件处理 CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yan-mq.github.io');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Content-Type-Options', 'nosniff');
  res.header('X-Content-Type-Options', 'nosniff');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// 测试路由
app.get('/', (req, res) => {
  res.json({ message: '服务器正在运行' });
});

// 聊天路由
app.use('/api', chatRoutes);

app.listen(config.port, () => {
  console.log(`服务器运行在 http://localhost:${config.port}`);
}); 