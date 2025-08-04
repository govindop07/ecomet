import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js';
import authUser from '../middleware/auth.js';
const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/update', authUser, updateCart);
cartRouter.get('/test', (req, res) => {
  res.send("api working")
});

export default cartRouter;