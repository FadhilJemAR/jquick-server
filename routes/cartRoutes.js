import express from 'express';
import { addProductUserCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/add',addProductUserCart);

export default router