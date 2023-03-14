import { RegistrationRequest } from '../../model/defintion';
import { FoundUser, IUserRepository } from '../../repository/user/definition';

export type RegistrationServiceDependencies = {
  userRepository: IUserRepository;
};

export interface IRegistrationService {
  register: (registration: RegistrationRequest) => Promise<FoundUser>;
}
