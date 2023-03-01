import express, { NextFunction, Request, Response } from 'express';
import { GenericResponse } from '../../definition';
import authService from '../../../../service/auth/auth-service';
import googleService from '../../../../service/auth/google-service';

const router = express.Router();

router.get('/v1/google', (req: Request, res: Response, next: NextFunction) => {
  return res.redirect(googleService.generateGoogleAuthorizationUrl());
});

router.get('/v1/google/callback', async (req: Request, res: Response, next: NextFunction) => {
    const query: {code: string} & any = req.query;

    const {tokens} = await googleService.oauth2Client().getToken(query.code);
    const info = await googleService.oauth2Client().getTokenInfo(tokens.access_token as string);
    console.log(info)

});

export default router;
