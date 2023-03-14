import prisma from '../configuration/database/datasource';
import makeUserRepository from './user/user-repository';

const prismaClient = prisma;

const userRepository = makeUserRepository({ dbClient: prismaClient });

export { userRepository };
