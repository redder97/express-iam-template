import { userRepository } from '../../repository';
import makeLogin from './use-cases/login';

const login = makeLogin({ userRepository });

export { login };
