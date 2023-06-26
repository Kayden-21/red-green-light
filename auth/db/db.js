const mysql = require('mysql2');
const util = require('util');
require('dotenv').config({path: '../.env'});


// Initialize the connection object here so it can be used in registerUser
let connection;

async function initialize() {
  try {
    
    // Establish a new connection to the MySQL database
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_AUTH
    });

    connection.connect((err) => {
      if (err) {
        console.error('A travesty has befallen us: ' + err.message);
        return;
      }
      console.log('Authentication database connected');
    });

  } catch (error) {
    console.error("Error retrieving secrets:", error);
  }
}

async function registerUser(username, password) {
  try {
    const insertQuery = 'INSERT INTO login (login_username, login_password) VALUES (?, ?)';

    connection.query(insertQuery, [username, password], (error, results) => {
      if (error) {
        console.error('Error executing the insert statement:', error);
        return;
      }
      console.log('Inserted successfully:', results);
    });

  } catch (error) {
    console.error('Error registering user:', error);
  }
}

async function doesUserExist(username) {
    try {
      // Prepare the SQL query and the values
      const selectQuery = 'SELECT * FROM login WHERE login_username = ?';
  
      // Create a promise-based version of connection.query
      const queryPromise = util.promisify(connection.query).bind(connection);
  
      const results = await queryPromise(selectQuery, [username]);
  
      // Check if any rows were returned by the query
      if (results.length > 0) {
        return true;
      } else {
        return false;
      }
  
    } catch (error) {
      console.error('Error checking if user exists:', error);
      throw error;  // re-throw the error to be handled by the caller
    }
  }

async function getUserPassword(username) {
    try {
      // Prepare the SQL query and the values
      const selectQuery = 'SELECT login_password FROM login WHERE login_username = ?';
  
      // Create a promise-based version of connection.query
      const queryPromise = util.promisify(connection.query).bind(connection);
  
      const results = await queryPromise(selectQuery, [username]);
  
      // Check if any rows were returned by the query
      if (results.length > 0) {
        // Return the hashed password
        return results[0].login_password;
      } else {
        console.log('No such user found');
        return null;
      }
  
    } catch (error) {
      console.error('Error retrieving user password:', error);
      throw error;  // re-throw the error to be handled by the caller
    }
  }

initialize();

module.exports = { registerUser, doesUserExist, getUserPassword };