import express, { NextFunction, Request, Response } from 'express';
import { GenericResponse } from '../../definition';
import authService from '../../../../service/auth/auth-service';

const router = express.Router();

router.post('/v1/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRequest = req.body;

    const result = await authService.login(loginRequest);

    return res.json({
      success: true,
      data: result,
    });
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
