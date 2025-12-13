const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getAllSweets,
  createSweet
} = require('../controllers/sweet.controller');

const router = express.Router();

router.get('/', authMiddleware, getAllSweets);
router.post('/', authMiddleware, adminMiddleware, createSweet);

module.exports = router;
