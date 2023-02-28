import express from 'express';
import log from 'npmlog';
import bodyParser from 'body-parser';
import AuthController from './api/rest/auth/v1/auth-controller';
import RegistrationController from './api/rest/registration/v1/register-controller';
import config from './config';

const PORT = config.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', AuthController);
app.use('/api', RegistrationController);

app.listen(PORT, () => {
  log.info(``, `IAM server started at port ${PORT}`);
});
