import { LoginRequest } from '../../../api/rest/auth/definition';
import { IUserRepository } from '../../../repository/user/definition';
import auth from '../../../util/auth';
import { UserView } from '../definition';

export interface MakeLoginDependencies {
  userRepository: IUserRepository;
}

const makeLogin = ({ userRepository }: MakeLoginDependencies) => {
  return async (login: LoginRequest) => {
    if (!login) {
      throw Error('login request not found.');
    }

    const { username, password } = login;

    try {
      const foundUser = await userRepository.findByUsername(username);

      if (!foundUser) {
        throw Error('user not found');
      }

      if (foundUser.password && !auth.comparePassword(password, foundUser.password)) {
        throw Error('invalid password');
      }

      return { token: auth.signJWT({ id: foundUser.id, ...new UserView(foundUser) }) };
    } catch (err: any) {
      throw err;
    }
  };
};

export default makeLogin;
