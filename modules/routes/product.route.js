import express from 'express'
import { createProduct ,deleteProduct,getProduct,getProductById,updateProduct,getBycategoryId} from '../controllers/product.controller.js'
import { upload } from '../middleware/multer.middleware.js';
import protectedRoute from '../middleware/authentication.js';
import {createCategory,allCategory} from '../controllers/category.controller.js'

const router = express.Router();

router.post('/createCategory',createCategory);
router.get('/allcategory',allCategory);
router.post('/createProduct/:categoryid',upload.single('image'), createProduct);   // admin work
router.delete('/deleteProduct/:id',protectedRoute,deleteProduct);   // admin work
router.put('/updateProduct/:id',protectedRoute,updateProduct);   // admin work
router.get('/allproducts',getProduct);
router.get('/product/:id',getProductById);

router.get('/productbyCategory/:id',getBycategoryId);


export default router