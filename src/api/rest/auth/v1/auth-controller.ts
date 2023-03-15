import express, { NextFunction, Request, Response } from 'express';
import config from '../../../../config';
import { login } from '../../../../service/auth';

const router = express.Router();

router.post('/v1/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRequest = req.body;

    const {token} = await login(loginRequest);

    res.redirect(`${config.OAUTH_SUCCESS_REDIRECT}?token=${token}`);
  } catch (err) {
    next(err);
  }
});

export default router;
