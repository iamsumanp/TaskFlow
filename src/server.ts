import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
const app: Application = express();
import pool from './db/index';
// const dotenv = require("dotenv").config();
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/usersRouter';
import { parse } from 'path';
import teamRouter from './routes/teamRouter';
import taskRouter from './routes/taskRouter';
dotenv.config();

app.use(express.json()); //parses the JSON data in the request body and populates req.body obj with the parsed data

const PORT = parseInt(process.env.PORT || '', 10) || 9000;

app.use('/api/v1/users', userRouter);

app.use('/api/v1/team', teamRouter);

app.use('/api/v1/task', taskRouter);

// app.use('/')

app.get('/', async (req: Request, res: Response) => {
  console.log(process.env.HELLO);
  // console.log("Root Directory", await pool.query("SELECT * FROM users"));
  res.send('Hello browiser');
});

app.listen(PORT, () => console.log('Server Running on ' + PORT));
