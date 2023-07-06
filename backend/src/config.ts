import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY || 'this-is-my-secret-key';
const PORT: number = +(process.env.PORT || 5000);

function getDatabaseURI(): string {
    return process.env.NODE_ENV === 'test' ? 'snowpro_test' : process.env.DATABASE_URL || 'snowpro';
}

const BCRYPT_WORK_FACTOR: number = process.env.NODE_ENV === 'test' ? 1 : 12;

console.log('SnowPro Config');
console.log(`SECRET KEY: ${SECRET_KEY}`);
console.log(`PORT: ${PORT.toString()}`);
console.log(`BCRYPT_WORK_FACTOR: ${BCRYPT_WORK_FACTOR}`);
console.log(`DATABASE: ${getDatabaseURI()}`);
console.log(`-----------------------`);

export { SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, getDatabaseURI };