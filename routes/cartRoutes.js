import express from 'express';
import { addProductUserCart, changeQuantityProductInCart, deleteProductFromCart, getProductsInCart } from '../controllers/cartController.js';
const router = express.Router({mergeParams:true});

router.post('/add',addProductUserCart);
router.get('/',getProductsInCart);
router.delete('/remove/:productId',deleteProductFromCart);
router.patch('/change/:productId',changeQuantityProductInCart);
export default router