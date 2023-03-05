import { PrismaClient } from '@prisma/client';
import log from 'npmlog';

let prisma = new PrismaClient();

(async () => {
  try {
    prisma.$connect();
  } catch (err: any) {
    log.error(``, err);
  }
})();

export default prisma;
