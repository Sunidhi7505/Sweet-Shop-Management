const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getAllSweets,
  searchSweets,
  createSweet,
  purchaseSweet,
  restockSweet,
  updateSweet,
  deleteSweet
} = require('../controllers/sweet.controller');

const router = express.Router();

router.get('/', authMiddleware, getAllSweets);
router.get('/search', authMiddleware, searchSweets);

router.post('/', authMiddleware, adminMiddleware, createSweet);
router.post('/:id/purchase', authMiddleware, purchaseSweet);
router.post('/:id/restock', authMiddleware, adminMiddleware, restockSweet);
router.put('/:id', authMiddleware, adminMiddleware, updateSweet);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSweet);

module.exports = router;
