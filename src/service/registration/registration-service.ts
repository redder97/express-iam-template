import { PrismaClient } from '@prisma/client';
import { RegistrationRequest } from '../../api/rest/registration/definition';
import log from 'npmlog';
import util from '../../util/auth';
import { GoogleProfile, GoogleRegistration } from '../auth/definition';
import userRepository from '../../repository/user-repository';

const register = async (registration: RegistrationRequest) => {
  const { username, email } = registration;

  try {
    const existingUser = await userRepository.findByEmailOrUsername(email, username);

    if (existingUser) {
      throw Error('username or email already exists!');
    }

    const createdUser = await userRepository.createUser({
      ...registration,
      password: util.hashPassword(registration.password),
    });

    return createdUser;
  } catch (err: any) {
    log.error(`DB`, err);
    log.error(`DB`, `Failed to create user`);

    throw err;
  }
};

const registerWithGoogle = async (registration: GoogleRegistration) => {
  const { email, provider } = registration;

  const existingUser = await userRepository.findUserByEmailAndProvider(email, provider);

  if (existingUser) {
    return existingUser;
  }

  const alreadyRegisteredEmail = await userRepository.findByEmailAndNotProvider(email, provider);

  if (alreadyRegisteredEmail) {
    throw Error('Your email is already registered');
  }

  try {
    const createdUser = await userRepository.createUser(registration);

    return createdUser;
  } catch (err: any) {
    log.error(`DB`, err);
    log.error(`DB`, `Failed to create user`);

    throw err;
  }
};

const userExists = async (email: string): Promise<boolean> => {
  const foundUser = await userRepository.findByEmail(email);

  return !!foundUser;
};

export default Object.freeze({
  register,
  userExists,
  registerWithGoogle,
});
