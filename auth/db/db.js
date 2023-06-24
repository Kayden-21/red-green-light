const mysql = require('mysql');
const getSecrets = require('../getSecrets');
const util = require('util');


// Initialize the connection object here so it can be used in registerUser
let connection;

async function initialize() {
  try {
    const [dbHostdetails, dbConnectiondetails] = await Promise.all([
      getSecrets.getSecret("prod/redgreenlight/dbHostdetails"),
      getSecrets.getSecret("rds!db-dafec5a1-0166-4a56-a1c8-9d77032fdafd"),
    ]);

    const parsedHostDetails = JSON.parse(dbHostdetails);
    const parsedConnectionDetails = JSON.parse(dbConnectiondetails);

    // Establish a new connection to the MySQL database
    connection = mysql.createConnection({
      host: parsedHostDetails.DBHost,
      user: parsedConnectionDetails.username,
      password: parsedConnectionDetails.password,
      port: parsedHostDetails.Port,
      database: "authdatabase",
    });

    connection.connect((err) => {
      if (err) {
        console.error('A travesty has befallen us: ' + err.message);
        return;
      }
      console.log('Connected to MySQL.');
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