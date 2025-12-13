const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getAllSweets,
  createSweet,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweet.controller');

const router = express.Router();

router.get('/', authMiddleware, getAllSweets);
router.post('/', authMiddleware, adminMiddleware, createSweet);
router.post('/:id/purchase', authMiddleware, purchaseSweet);
router.post('/:id/restock', authMiddleware, adminMiddleware, restockSweet);

module.exports = router;
