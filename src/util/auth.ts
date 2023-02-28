import bcrypt from 'bcrypt';
import config from '../config';

const saltRounds = config.SALT_ROUNDS

const hashPassword = (plaintext: string): string => {
  const salt = bcrypt.genSaltSync(parseInt(saltRounds as string));
  console.log(salt)
  return bcrypt.hashSync(plaintext, parseInt(salt as string));
};

const comparePassword = (plaintext: string, hash: string): boolean => {
  return bcrypt.compareSync(plaintext, hash);
};

export default Object.freeze({
    hashPassword,
    comparePassword
})