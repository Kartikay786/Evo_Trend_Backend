import express  from 'express'
import { orderPlace,allOrder,orderbyUserid } from '../controllers/order.controller.js'
import protectedRoute from '../middleware/authentication.js';

const router = express.Router();

router.post('/placeorder',orderPlace);
router.get('/allorder',allOrder); //for admin
router.get('/orderbyuserId',protectedRoute,orderbyUserid);

export default router

    