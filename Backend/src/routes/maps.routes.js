import express from "express"
import {query} from 'express-validator'
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as mapController from '../controllers/map.controllers.js';


const router = express.Router();

router.get('/get-coordinates',query('adress').isString({min:3}),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getDistanceTime

)

router.get('/get-suggestion',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

export default router;