import bcrypt from 'bcryptjs';
import config from '../config';
import JWT from 'jsonwebtoken';
import { JWTpayload } from '../service/auth/definition';
//@ts-ignore - no types
import rsaPemToJwk from 'rsa-pem-to-jwk';
import fs from 'fs';

const saltRounds = config.SALT_ROUNDS

const hashPassword = (plaintext: string): string => {
  const salt = bcrypt.genSaltSync(parseInt(saltRounds as string));
  return bcrypt.hashSync(plaintext, parseInt(salt as string));
};

const comparePassword = (plaintext: string, hash: string): boolean => {
  return bcrypt.compareSync(plaintext, hash);
};

const signJWT = (payload: JWTpayload) => {
  const secretBuffer = fs.readFileSync('./certs/jwtRS256.key')
  const token = JWT.sign(payload, secretBuffer, {expiresIn: '10min', algorithm: 'RS256'});

  return token;
}

export default Object.freeze({
    hashPassword,
    comparePassword,
    signJWT,
})