import express, { NextFunction, Request, Response } from 'express';
import googleService from '../../../../service/oauth/google-service';
import log from 'npmlog';
import config from '../../../../config';

const router = express.Router();

router.get('/v1/google', (req: Request, res: Response, next: NextFunction) => {
  return res.redirect(googleService.generateGoogleAuthorizationUrl());
});

router.get('/v1/google/callback', async (req: Request, res: Response, next: NextFunction) => {
  const query: { code: string } & any = req.query;

  try {
    const { tokens } = await googleService.oauth2Client().getToken(query.code);
    const googleProfile = await googleService.getGoogleProfile(tokens.access_token as string);
    const jwt = await googleService.handleGoogleProfile(googleProfile);

    res.redirect(`${config.OAUTH_SUCCESS_REDIRECT}?token=${jwt.token}`);
  } catch (err: any) {
    log.error(`[${process.pid}]`, err);
    next(err);
  }
});

export default router;
