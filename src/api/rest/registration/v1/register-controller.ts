import express, { NextFunction, Request, Response } from 'express';
import { RegistrationRequest } from '../definition';
import log from 'npmlog';
import { GenericResponse } from '../../definition';
import { register } from '../../../../service/registration';

const router = express.Router();

router.post(`/v1/register`, async (req: Request, res: Response, next: NextFunction) => {
  const registration: RegistrationRequest = req.body;

  if (!registration) {
    next(Error('registration request error'));
  }

  try {
    const result = await register(registration);
    const response: GenericResponse<any> = {
      data: result,
      message: 'registration successful',
      success: true,
    };

    return res.json(response);
  } catch (err: any) {
    log.error(``, err);
    next(err);
  }
});

export default router;
