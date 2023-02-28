import express from 'express';
import * as dotenv from 'dotenv';
import log from 'npmlog';
import bodyParser from 'body-parser';
import AuthController from './api/rest/auth/v1/auth-controller'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', AuthController);

app.listen(PORT, () => {
  log.info(``, `IAM server started at port ${PORT}`);
});

