const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const sweetRoutes = require('./routes/sweet.routes');
const authMiddleware = require('./middlewares/auth.middleware');



const app = express();

// global middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);
// protected test route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Access granted',
    user: req.user
  });
});

// health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
