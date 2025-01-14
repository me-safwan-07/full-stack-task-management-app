import { Router } from "express";
import { 
    CreateMenu, 
    deleteMenuById, 
    getAllMenuItems, 
    updateMenuById 
} from "../controllers/menuController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/menu
router.get('/', getAllMenuItems);

// POST /api/menu/
router.post('/', authMiddleware, CreateMenu);

// PUT /api/menu/:id
router.put('/:id', authMiddleware,  updateMenuById);

// DELETE /api/menu/:id
router.delete('/:id', authMiddleware, deleteMenuById);

export default router;