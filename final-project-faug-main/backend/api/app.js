import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import cors from 'cors'; 
import model from './models/index.js';

const app = express();

//mongoose connection to store it in the database
mongoose.connect('mongodb://localhost:27017/fitnessdb');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
//initialise the routes
routes(app);

export default app;