import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './lib/db.js';
import connectCloudinary from './lib/cloudinary.js';
import userRoutes from './routes/user.route.js'

// App configs
const app = express();
dotenv.config();
connectCloudinary();
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use('/api/user', userRoutes);
app.get('/', (req, res) => {
  res.send("sbdicnsinc")
})

app.listen(port, () => {
  console.log("Server is running on port:", port);
  connectDb();
})