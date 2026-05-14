import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', cartController.addToCart);
router.get('/allproducts', cartController.getCartItems);
router.delete('/removeproduct/:id', cartController.removeFromCart);

export default router;