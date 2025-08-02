import './loadEnv.js'
import express from 'express';
import cors from 'cors';
import connectDb from './lib/db.js';
import connectCloudinary from './lib/cloudinary.js';
import userRoutes from './routes/user.route.js'
import productRoutes from './routes/product.route.js'
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

// App configs
const app = express();
connectCloudinary();
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log("Server is running on port:", port);
  connectDb();
})