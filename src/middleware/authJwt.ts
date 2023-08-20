import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    const token = authHeader?.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (typeof token === 'string') {
      if (!secret) throw new Error('secret key is undefined on authJwt.hs');
      jwt.verify(token, secret);
      next();
    } else {
      res.status(401).json({
        errorMessage: 'UnAuthorised!!!',
      });
    }
  } catch (error) {
    res.status(401).json({
      errorMessage: error,
    });
  }
};

export { authenticateUser };
