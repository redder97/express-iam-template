import fs from 'fs';

//@ts-ignore
import rsaPemToJwk from 'rsa-pem-to-jwk';

const secretBuffer = fs.readFileSync('./certs/jwtRS256.key');
const keys = [rsaPemToJwk(secretBuffer, { use: 'sig' }, 'public')];

const getJWK = () => {
  return { keys }
};

export default Object.freeze({
    getJWK
})
