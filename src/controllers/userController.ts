import { Request, Response } from 'express';
import dotenv from 'dotenv';
// dotenv.config();

import pool from '../db/index';
const getUsers = async (req: Request, res: Response) => {
  const data = await pool.query('SELECT * FROM users');
  const { rows } = data;

  return res.status(200).json(rows);
};
const getUser = async (req: Request, res: Response) => {
  const data = await pool.query(`SELECT * FROM users WHERE name = 'email'`);
  const { fields } = data;
  console.log(fields);
  return res.status(200).json(fields[0]);
};

const signupUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    //fix logic here
    if (username && password) {
      await pool.query(
        `INSERT INTO users (fname,password) VALUES ('${username}', '${password}')`
      );
      return res.status(200).json({
        message: 'successfully logged In',
      });
    } else {
      return res.status(500).json({
        message: 'Error Occured',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Error Occured',
      error: e,
    });
  }
};

export { getUsers, getUser, signupUser };
