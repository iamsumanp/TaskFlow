import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

import pool from '../db/index';
import { authenticateUser } from '../middleware/authJwt';
const getUsers = async (req: Request, res: Response) => {
  const data = await pool.query('SELECT * FROM users');
  const { rows } = data;

  return res.status(200).json(rows);
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = await pool.query(`SELECT * FROM users WHERE fname = 'email'`);
  const { fields } = data;
  // console.log(fields);
  // authenticateUser(req, res, next);
  console.log('tset the get user');
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
  console.log(req.headers);

  if (username && password) {
    const user = await pool.query('SELECT * fROM users WHERE fname = $1 ', [
      username,
    ]);

    //TODO authenticate if the hash password in the db is same as well
    if (user && user.rows.length) {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        //ts sctrictly checks the type of the secret var .since it is being retrieved from env. it might not be defined . so make sure that secret is defined
        throw new Error('No jwt key found');
      }
      const token = jwt.sign(user.rows[0].user_id, secret); //? add expiresTime
      console.log(user.rows, token);
      //? maybe set cookiw with the token as well instead of using the authorization headers

      res.status(200).json({
        message: 'successfully logged in', //set cookie and set header i guess
        token,
      });
    } else {
      res.status(500).json({
        message: 'User does not exists',
      });
    }
  }
};

export { getUsers, getUser, signupUser, loginUser };
