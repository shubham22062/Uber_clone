import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectToDb from './src/db';


connectToDb();


const app = express();

export default app;
