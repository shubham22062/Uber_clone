import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controllers.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Inavlid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be atleast 3 charcter long'),
    body('password').isLength({min:3}).withMessage('password must be at least 6 characters long')
],
    userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Inavalid Email'),
    body('password').length({min:6}).withMessage('Password must must be at least 6 character long')

],
    userController.loginUser
)

router.get('/profile',authMiddleware.authUser ,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)


export default router;