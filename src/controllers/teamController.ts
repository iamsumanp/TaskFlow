import { Request, Response } from 'express';

const getTeams = (req: Request, res: Response) => {
  return res.status(200).json({
    yourResponse: 'your teams',
  });
};

export { getTeams };
