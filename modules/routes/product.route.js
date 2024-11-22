import express from 'express'
import { createProduct ,deleteProduct,getProduct,getProductById,updateProduct} from '../controllers/product.controller.js'
import { upload } from '../middleware/multer.middleware.js';
import protectedRoute from '../middleware/authentication.js';

const router = express.Router();

router.post('/createProduct',upload.single('image'), createProduct);   // admin work
router.delete('/deleteProduct/:id',protectedRoute,deleteProduct);   // admin work
router.put('/updateProduct/:id',protectedRoute,updateProduct);   // admin work
router.get('/allproducts',getProduct);
router.get('/product/:id',getProductById);


export default router