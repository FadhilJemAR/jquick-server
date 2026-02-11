import express from 'express';
import { createProduct, getProducts,searchProducts,getProductById } from '../controllers/productController.js';

const router = express.Router({mergeParams:true});

router.get('/',getProducts);
router.post('/',createProduct);
router.get('/:productId',getProductById);
router.get('/search',searchProducts);
export default router