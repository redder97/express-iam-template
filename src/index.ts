import os from 'os';
import cluster from 'node:cluster';
import process from 'process';

import express, { NextFunction, Request, Response } from 'express';
import log from 'npmlog';
import bodyParser from 'body-parser';
import AuthController from './api/rest/auth/v1/auth-controller';
import RegistrationController from './api/rest/registration/v1/register-controller';
import GoogleController from './api/rest/google/v1/google-controller';
import config from './config';
import jwks from './configuration/token/jwks';
import { GenericResponse } from './model/defintion';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  log.info(`[${process.pid}]`, `Primary cluster is running`);
  log.info(`[${process.pid}]`, `${numCPUs} num of CPUs detected`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    log.info(``, `Worker ${worker.process.pid} has died`);
  });
} else {
  log.info(`[${process.pid}]`, `Worker has started`);

  const PORT = config.PORT;

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/public/.well-known/jwks.json', (req: Request, res: Response) => {
    return res.json(jwks.getJWK());
  });

  app.use('/api', AuthController);
  app.use('/api', RegistrationController);
  app.use('/api', GoogleController);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const message = err ? err.message : 'An unexpected error occurred';

    const caughtResponse: GenericResponse<any> = {
      success: false,
      message,
    };

    return res.json(caughtResponse);
  });

  app.listen(PORT, () => {
    log.info(`[${process.pid}]`, `IAM server started at port ${PORT}`);
  });

}
