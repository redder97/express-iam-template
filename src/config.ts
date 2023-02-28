import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
    SALT_ROUNDS: process.env['SALT_ROUNDS'],
    DATABASE_URL: process.env['DATABASE_URL'],
    PORT: process.env['PORT']
}