import express from 'express'
import { createProduct ,deleteProduct} from '../controllers/product.controller.js'

const router = express.Router();

router.post('/createProduct',createProduct);   // admin work
router.delete('/deleteProduct/:id',deleteProduct);   // admin work


export default router