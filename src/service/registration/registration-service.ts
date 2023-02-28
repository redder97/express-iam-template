import { PrismaClient } from '@prisma/client';
import { RegistrationRequest } from '../../api/rest/registration/definition';
import log from 'npmlog';
import util from '../../util/auth';

const prisma = new PrismaClient();

const register = async (registration: RegistrationRequest) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: registration.username,
        },
        {
          email: registration.email,
        },
      ],
    },
  });

  if (existingUser) {
    throw Error('username or email already exists!');
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        ...registration,
        password: util.hashPassword(registration.password)
      },
    });

    return createdUser;
  } catch (err: any) {
    log.error(`DB`, err);
    log.error(`DB`, `Failed to create user`);

    throw err;
  }
};

export default Object.freeze({
  register,
});
