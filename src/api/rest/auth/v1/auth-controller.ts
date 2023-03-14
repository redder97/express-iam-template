import express, { NextFunction, Request, Response } from 'express';
import { GenericResponse } from '../../definition';
import authService from '../../../../service/auth/auth-service';
import config from '../../../../config';

const router = express.Router();

router.post('/v1/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRequest = req.body;

    const {token} = await authService.login(loginRequest);

    res.redirect(`${config.OAUTH_SUCCESS_REDIRECT}?token=${token}`);
  } catch (err) {
    next(err);
  }
});

export default router;
