import express from 'express';
import passport from 'passport';
import { loginUser,logoutUser,register } from '../controllers/authcontrollers.js';

const router=express.Router();

router.post("/login", loginUser);
router.post("/register", register);
router.post("/logout", logoutUser);

export default router;
