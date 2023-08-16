import { Request, Response } from 'express';
import dotenv from 'dotenv';

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
      const userExists = await pool.query(
        'SELECT 1 fROM users WHERE fname = $1', //gives numbers according to count in db with similar name
        [username]
      );

      if (userExists.rows.length) {
        return res.status(200).json({
          message: 'Sorry. User already exists. Try again',
        });
      }

      //TODO hash the password before deploying the the database maybe with bcrypt
      //TODO set cookie with

      await pool.query(`INSERT INTO users (fname,password) VALUES ($1, $2)`, [
        username,
        password,
      ]);
      return res.status(200).json({
        message: 'successfully logged In', //return cookie and set header i guess
      });
    } else {
      return res.status(500).json({
        message: 'Please enter both username and password',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Error Occured',
      error: e,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username && password) {
    const query = await pool.query('SELECT 1 fROM users WHERE fname = $1 ', [
      username,
    ]);

    //TODO authenticate if the hash password in the db is same as well
    if (query.rows.length) {
      res.status(200).json({
        message: 'successfully logged in', //set cookie and set header i guess
      });
    } else {
      res.status(500).json({
        message: 'User does not exists',
      });
    }
  }
};

export { getUsers, getUser, signupUser, loginUser };
