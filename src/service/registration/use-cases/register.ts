import log from 'npmlog';
import { IUserRepository } from '../../../repository/user/definition';
import auth from '../../../util/auth';
import { RegistrationRequest } from '../../../model/defintion';

export interface MakeRegisterDependencies {
  userRepository: IUserRepository;
}

const makeRegister = ({ userRepository }: MakeRegisterDependencies) => {
  return async (registration: RegistrationRequest) => {
    const { username, email } = registration;

    try {
      const existingUser = await userRepository.findByEmailOrUsername(email, username);

      if (existingUser) {
        throw Error('username or email already exists!');
      }

      const createdUser = await userRepository.createUser({
        ...registration,
        password: auth.hashPassword(registration.password),
      });

      return createdUser;
    } catch (err: any) {
      log.error(`DB`, err);
      log.error(`DB`, `Failed to create user`);

      throw err;
    }
  };
};

export default makeRegister;
