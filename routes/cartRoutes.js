import express from 'express';
import { addProductUserCart, deleteProductFromCart, getProductsInCart } from '../controllers/cartController.js';
const router = express.Router({mergeParams:true});

router.post('/add',addProductUserCart);
router.get('/',getProductsInCart);
router.delete('/remove/:productId',deleteProductFromCart);

export default router