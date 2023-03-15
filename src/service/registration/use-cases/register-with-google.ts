import log from 'npmlog';
import { IUserRepository } from '../../../repository/user/definition';
import { GoogleRegistration } from '../../auth/definition';

export interface MakeRegisterWithGoogleDependencies {
  userRepository: IUserRepository;
}

const makeRegisterWithGoogle = ({ userRepository }: MakeRegisterWithGoogleDependencies) => {
  return async (registration: GoogleRegistration) => {
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
      log.error(`[${process.pid}]`, err);
      log.error(`[${process.pid}]`, `DB Failed to create user`);

      throw err;
    }
  };
};

export default makeRegisterWithGoogle;
