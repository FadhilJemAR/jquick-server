import express from 'express';
import { createProduct, getProducts,searchProducts } from '../controllers/productController.js';

const router = express.Router({mergeParams:true});

router.get('/',getProducts);
router.post('/',createProduct);
router.get('/search',searchProducts);
export default router