const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const config = require('./config');

const app = express();

// 更新 CORS 配置
app.use(cors({
  origin: ['https://yan-mq.github.io', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

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