import log from 'npmlog';
import { GoogleRegistration } from '../../service/auth/definition';
import prisma from '../../configuration/database/datasource';
import { IUserRepository, UserRepositoryDependecies } from './definition';
import { RegistrationRequest } from '../../model/defintion';

const makeUserRepository = ({dbClient}: UserRepositoryDependecies): IUserRepository => {

  const findUserByEmailAndProvider = async (email: string, provider: string) => {
    if (!email || !provider) {
      log.error(`DB`, 'email or provider is missing');

      throw Error('Email or provider missing');
    }

    try {
      return await prisma.user.findFirst({
        where: {
          AND: [
            {
              email,
            },
            {
              provider,
            },
          ],
        },
      });
    } catch (err) {
      log.error(`DB`, `Error in findUserByEmailAndProvider`);
      throw err;
    }
  };

  const findByEmailAndNotProvider = async (email: string, provider: string) => {
    try {
      return await dbClient.user.findFirst({
        where: {
          AND: [
            {
              OR: [
                {
                  provider: null,
                },
                {
                  NOT: {
                    provider,
                  },
                },
              ],
            },
            {
              email,
            },
          ],
        },
      });
    } catch (err) {
      log.error(`DB`, `Error in findByEmailAndNotProvider`);
      throw err;
    }
  };

  const findByEmailOrUsername = async (email: string, username: string) => {
    try {
      return await dbClient.user.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              username,
            },
          ],
        },
      });
    } catch (err) {
      log.error(`DB`, `Error retrieving by username or email`);
      throw err;
    }
  };

  const createUser = async (user: GoogleRegistration | RegistrationRequest) => {
    try {
      return await dbClient.user.create({
        data: user,
      });
    } catch (err) {
      log.error(`DB`, `Error creating user`);
      throw err;
    }
  };

  const findByEmail = async (email: string) => {
    try {
      return await dbClient.user.findFirst({
        where: {
          email,
        },
      });
    } catch (err) {
      log.err(`DB`, err);
      throw Error('Error on data Layer');
    }
  };

  const findByUsername = async (username: string) => {
    try {
      return await dbClient.user.findFirst({
        where: {
          username,
        },
      });
    } catch (err) {
      log.err(`DB`, err);
      throw Error('Error on data Layer');
    }
  };

  return Object.freeze({
    findUserByEmailAndProvider,
    findByEmailAndNotProvider,
    findByEmailOrUsername,
    createUser,
    findByEmail,
    findByUsername
  })

}

export default makeUserRepository;
