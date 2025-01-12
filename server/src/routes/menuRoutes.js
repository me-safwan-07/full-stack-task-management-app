import { Router } from "express";
import { 
    CreateMenu, 
    deleteMenuById, 
    getAllMenuItems, 
    updateMenuById 
} from "../controllers/menuController.js";

const router = Router();

// GET /api/menu
router.get('/', getAllMenuItems);

// POST /api/menu/
router.post('/', CreateMenu);

// PUT /api/menu/:id
router.put('/:id', updateMenuById);

// DELETE /api/menu/:id
router.delete('/:id', deleteMenuById);

export default router;