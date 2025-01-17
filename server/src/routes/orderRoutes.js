import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/order/
router.post('/', createOrder);

// GET /api/order/
router.get('/', getOrders);

export default router;