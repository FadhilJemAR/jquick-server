import express from 'express';
import { addProductUserCart } from '../controllers/cartController';
const router = express.Router();

router.post('/add',addProductUserCart);

export default router