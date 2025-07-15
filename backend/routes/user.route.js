import express from 'express';
import { adminLogin, loginUser, RegisterUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.get('/login', loginUser);
router.post('/admin', adminLogin);

export default router;