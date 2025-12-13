const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
const authMiddleware = require('./middlewares/auth.middleware');

app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Access granted',
    user: req.user
  });
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
