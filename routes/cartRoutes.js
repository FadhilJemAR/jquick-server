import express from 'express';
import { addProductUserCart, deleteProductFromCart, getProductsInCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/add',addProductUserCart);
router.get('/',getProductsInCart);
router.delete('/remove',deleteProductFromCart);

export default router