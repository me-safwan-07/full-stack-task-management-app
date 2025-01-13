import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/order/
router.post('/', authMiddleware, createOrder);

// GET /api/order/
router.get('/', authMiddleware, getOrders);

export default router;