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
  deleteSweet,
  getRevenueReport
} = require('../controllers/sweet.controller');

const router = express.Router();

/* =====================
   PUBLIC ROUTES
===================== */
router.get('/', getAllSweets);
router.get('/search', searchSweets);

/* =====================
   ADMIN REVENUE ROUTE
===================== */
router.get(
  '/revenue',
  authMiddleware,
  adminMiddleware,
  getRevenueReport
);

/* =====================
   AUTHENTICATED ROUTES
===================== */
router.post('/:id/purchase', authMiddleware, purchaseSweet);

/* =====================
   ADMIN ROUTES
===================== */
router.post('/', authMiddleware, adminMiddleware, createSweet);
router.post('/:id/restock', authMiddleware, adminMiddleware, restockSweet);
router.put('/:id', authMiddleware, adminMiddleware, updateSweet);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSweet);

module.exports = router;
