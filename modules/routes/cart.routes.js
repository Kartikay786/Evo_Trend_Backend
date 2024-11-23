import { addItem,getcartItem,deleteItem} from "../controllers/cart.controller.js";
import express from 'express'
import protectedRoute from "../middleware/authentication.js";

const router = express.Router();

router.post('/additem',protectedRoute,addItem);
router.get('/addedItem',protectedRoute,getcartItem);
router.delete('/deleteItem/:id',protectedRoute,deleteItem)

export default router