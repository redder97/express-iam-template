import { PrismaClient } from '@prisma/client';
import { RegistrationRequest } from '../../api/rest/registration/definition';
import log from 'npmlog';
import util from '../../util/auth';
import { GoogleProfile, GoogleRegistration } from '../auth/definition';

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
        password: util.hashPassword(registration.password),
      },
    });

    return createdUser;
  } catch (err: any) {
    log.error(`DB`, err);
    log.error(`DB`, `Failed to create user`);

    throw err;
  }
};

const registerWithGoogle = async (registration: GoogleRegistration) => {

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        {
          email: registration.email,
        },
        {
          provider: registration.provider,
        },
      ],
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const alreadyRegisteredEmail = await prisma.user.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              provider: null
            },
            {
              NOT: {
                provider: registration.provider
              }
            }
          ]
        },
        {
          email: registration.email,
        },
      ],
    },
  });

  if (alreadyRegisteredEmail) {
    throw Error('Your email is already registered');
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        ...registration,
      },
    });

    return createdUser;
  } catch (err: any) {
    log.error(`DB`, err);
    log.error(`DB`, `Failed to create user`);

    throw err;
  }
};

const userExists = async (email: string): Promise<boolean> => {
  const foundUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return !!foundUser;
};

export default Object.freeze({
  register,
  userExists,
  registerWithGoogle,
});
