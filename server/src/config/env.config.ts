const env = require('dotenv');
env.config();

export const appConfig = {
    port: process.env.APP_PORT,
    bcrypt_salt: Number(process.env.BCRYPT_SALT),
    jwt_secret: process.env.JWT_SECRET
}