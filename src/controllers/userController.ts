import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
dotenv.config();

import pool from '../db/index';

const getAllUsers = async (req: Request, res: Response) => {
  const data = await pool.query('SELECT * FROM users');
  const { rows } = data;

  return res.status(200).json(rows);
};
const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userData = await pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [id]
    );
    const { rows } = userData;
    if (rows.length) {
      return res.status(200).json({
        status: 'success',
        user: rows[0],
      });
    } else {
      return res.status(404).json({
        message: `No user found with id - ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error Occured',
      error,
    });
  }

  // return res.status(200).json(fields[0]);
};

const signupUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

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

      const saltRound = 10;
      const hashedPassword = await bcrypt
        .hash(password, saltRound)
        .then((hash) => hash);

      //TODO hash the password before deploying the the database maybe with bcrypt
      //TODO set cookie with

      await pool.query(`INSERT INTO users (fname,password) VALUES ($1, $2)`, [
        username,
        hashedPassword,
      ]);

      const user = await pool.query('SELECT * FROM users WHERE fname = $1', [
        username,
      ]);
      const { rows } = user;

      return res.status(200).json({
        message: 'successfully Signed up', //return cookie and set header i guess
        user: rows[0],
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
      //? maybe set cookiw with the token as well instead of using the authorization headers

      const { rows } = user;
      const hashPassword = rows[0].password;
      const verifyPassword = await bcrypt.compare(password, hashPassword);

      if (!verifyPassword)
        return res.status(401).json({ message: 'Invalid credentials' });

      res.status(200).json({
        message: 'successfully logged in', //set cookie and set header i guess
        token,
        user: rows[0],
      });
    } else {
      res.status(500).json({
        message: 'User does not exists',
      });
    }
  }
};

export { getAllUsers, getUser, signupUser, loginUser };
