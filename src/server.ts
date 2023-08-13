import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
const app: Application = express();
import pool from './db/index';
// const dotenv = require("dotenv").config();
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/usersRouter';

dotenv.config();

app.use(express.json());

const PORT = 9000;

app.use('/users', userRouter);
app.get('/', async (req: Request, res: Response) => {
  console.log(process.env.HELLO);
  // console.log("Root Directory", await pool.query("SELECT * FROM users"));
  res.send('Hello browiser');
});

app.listen(PORT, () => console.log('Server Running on ' + PORT));
