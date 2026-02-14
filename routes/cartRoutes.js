import express from 'express';
import { addProductUserCart, getProductsInCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/add',addProductUserCart);
router.get('/',getProductsInCart)
export default router