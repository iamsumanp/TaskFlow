import { Request, Response } from 'express';

const getTasks = (req: Request, res: Response) => {
  return res.status(200).json({
    response: 'your tasks',
  });
};

export { getTasks };
