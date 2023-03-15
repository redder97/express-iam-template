import { userRepository } from '../../repository';
import makeRegister from './use-cases/register';

import makeRegisterWithGoogle from './use-cases/register-with-google';

const register = makeRegister({ userRepository });
const registerWithGoogle = makeRegisterWithGoogle({ userRepository });

export { registerWithGoogle, register };
