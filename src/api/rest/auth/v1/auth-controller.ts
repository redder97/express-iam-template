import express, { NextFunction, Request, Response } from 'express';
import { GenericResponse } from '../../definition';

const router = express.Router();

router.post('/v1/login', (req: Request, res: Response, next: NextFunction) => {
  try {

    throw Error('method not implemented');

  } catch (err) {
    next(err);
  }
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const caughtResponse: GenericResponse<any> = {
    success: false,
    message: err.message,
  };

  return res.json(caughtResponse);
});

export default router;
