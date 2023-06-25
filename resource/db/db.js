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
      return;
    }

    connection.query(insertQuery, [username, ], (error, results) => {
      if (error) {
        console.error('Error executing the insert statement:', error);
        return;
      }
      console.log('Inserted successfully:', results);
    });

  } catch (error) {
    console.error('Error submitting game:', error);
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