import { Request, Response } from 'express';
import dotenv from 'dotenv';
// dotenv.config();

import pool from '../db/index';
const getUsers = async (req: Request, res: Response) => {
  const data = await pool.query('SELECT * FROM users');
  const { fields } = data;

  return res.status(200).json(fields);
};
const getUser = async (req: Request, res: Response) => {
  const data = await pool.query(`SELECT * FROM users WHERE name = 'email'`);
  const { fields } = data;
  console.log(fields);
  return res.status(200).json(fields[0]);
};

export { getUsers, getUser };
