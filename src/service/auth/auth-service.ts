import { PrismaClient } from '@prisma/client';
import { LoginRequest } from '../../api/rest/auth/definition';
import auth from '../../util/auth';
import { UserView } from './definition';

const prisma = new PrismaClient();

const login = async (login: LoginRequest) => {
  if (!login) {
    throw Error('login request not found.');
  }

  try {
    const foundUser = await prisma.user.findFirstOrThrow({
      where: {
        username: login.username,
      },
    });

    if (!foundUser) {
      throw Error('user not found');
    }

    if (!auth.comparePassword(login.password, foundUser.password)) {
      throw Error('invalid password');
    }

    return new UserView(foundUser);
  } catch (err: any) {
    throw err;
  }
};

export default Object.freeze({
    login
})
