import { PrismaClient } from '@prisma/client';
import { LoginRequest } from '../../api/rest/auth/definition';
import auth from '../../util/auth';
import { UserView } from './definition';
import userRepository from '../../repository/user-repository';

const login = async (login: LoginRequest) => {
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

export default Object.freeze({
  login,
});
