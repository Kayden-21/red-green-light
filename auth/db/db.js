const mysql = require('mysql2/promise'); // Note: using mysql2/promise for Promise based API
const util = require('util');
require('dotenv').config({path: '../.env'});

let pool;

async function initialize() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_AUTH,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('Authentication database connected');
    connection.release();

  } catch (error) {
    console.error("Error retrieving secrets:", error);
  }
}

async function executeQuery(query, params) {
  const connection = await pool.getConnection();
  try {
    const [results, ] = await connection.query(query, params);
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    // Ensure the connection is released back to the pool even if query fails
    connection.release();
  }
}

async function registerUser(username, password) {
  try {
    const insertQuery = 'INSERT INTO login (login_username, login_password) VALUES (?, ?)';
    const results = await executeQuery(insertQuery, [username, password]);
    console.log('Inserted successfully:', results);
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

async function doesUserExist(username) {
  try {
    const selectQuery = 'SELECT * FROM login WHERE login_username = ?';
    const results = await executeQuery(selectQuery, [username]);
    return results.length > 0;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    throw error;
  }
}

async function getUserPassword(username) {
  try {
    const selectQuery = 'SELECT login_password FROM login WHERE login_username = ?';
    const results = await executeQuery(selectQuery, [username]);

    if (results.length > 0) {
      return results[0].login_password;
    } else {
      console.log('No such user found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user password:', error);
    throw error;
  }
}

initialize();

module.exports = { registerUser, doesUserExist, getUserPassword };
