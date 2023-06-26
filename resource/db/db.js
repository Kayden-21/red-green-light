const mysql = require('mysql');
const util = require('util');
require('dotenv').config({ path: 'config.env' });

// Initialize the connection object here so it can be used in registerUser
let connection;

async function initialize() {
  try {

    // Establish a new connection to the MySQL database
    console.log(process.env.DBSERVER)
    connection = mysql.createConnection({
      host: process.env.DBSERVER,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      port: process.env.DBPORT,
      database: "gamedatabase",
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

async function submitGame(username, score) {
  try {
    const insertQuery = 'INSERT INTO leaderboard (leaderboard_username, leaderboard_score) VALUES (?, ?)';

    const numericScore = Number(score);

    if (numericScore === NaN) {
      console.error('Score needs to be a number');
      return false;
    }

    connection.query(insertQuery, [username, numericScore], (error, results) => {
      if (error) {
        console.error('Error executing the insert statement:', error);
        return false;
      }
      console.log('Inserted successfully:', results);
      return true;
    });

  } catch (error) {
    console.error('Error submitting game:', error);
    return false;
  }
}

async function getLeaderboard() {
  try {
    // Prepare the SQL query and the values
    const selectQuery = 'SELECT leaderboard_username, leaderboard_score FROM leaderboard ORDER BY leaderboard_score DESC';

    // Create a promise-based version of connection.query
    const queryPromise = util.promisify(connection.query).bind(connection);

    const results = await queryPromise(selectQuery);

    // Return result
    return results;

  } catch (error) {
    console.error('Error getting leaderboard data:', error);
    throw error;  // re-throw the error to be handled by the caller
  }
}

initialize();

module.exports = { submitGame, getLeaderboard };