import express from 'express';
import {body} from 'express-validator';
import  * as captainController from "..controllers/captain.controllers.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be atleast 3 character long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 character long'),
    body('vehical.color').isLength({min:3}).withMessage('color must be atleast 3 character long'),
    body(vehical.plate).isLength({min:3}).withMessage('Plate must be atleast 3 charcter long'),
    body('vehical.capacity').isInt({min:1}).withMessage('capacity must be 1 '),
    body('vehical.vehicalType').isIn(['car','motorcycle','auto']).withMessage('Inavlid vehical type')

],
    captainController.registerCaptain
)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:3}).withMessage('Password must be atleast 6 charchter long')
],
    captainController.loginCaptain
)


router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


export default router;