const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
} = process.env;

module.exports = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
};