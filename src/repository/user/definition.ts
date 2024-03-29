import { PrismaClient } from '@prisma/client';
import { GoogleRegistration } from '../../service/auth/definition';
import { RegistrationRequest } from '../../model/defintion';

export type FoundUser = {
  id: number;
  username: string;
  email: string;
  providerId?: string;
  name: string;
  password: string
};

export type UserRepositoryDependecies = {
  dbClient: PrismaClient;
};

export interface IUserRepository {
  findUserByEmailAndProvider: (email: string, provider: string) => Promise<FoundUser>;
  findByEmailAndNotProvider: (email: string, provider: string) => Promise<FoundUser>;
  findByEmailOrUsername: (email: string, username: string) => Promise<FoundUser>;
  createUser: (user: GoogleRegistration | RegistrationRequest) => Promise<FoundUser>;
  findByEmail: (email: string) => Promise<FoundUser>;
  findByUsername: (username: string) => Promise<FoundUser>;
}
