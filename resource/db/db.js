const mysql = require('mysql2/promise');
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
      database: process.env.DB_GAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('Game database connected');
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
    connection.release();
  }
}

async function submitGame(username, score) {
  try {
    const insertQuery = 'INSERT INTO leaderboard (leaderboard_username, leaderboard_score) VALUES (?, ?)';
    const numericScore = Number(score);

    if (isNaN(numericScore)) {
      console.error('Score needs to be a number');
      return false;
    }

    const results = await executeQuery(insertQuery, [username, numericScore]);
    console.log('Inserted successfully:', results);
    return true;

  } catch (error) {
    console.error('Error submitting game:', error);
    return false;
  }
}

async function getLeaderboard() {
  try {
    const selectQuery = 'SELECT leaderboard_username, leaderboard_score FROM leaderboard ORDER BY leaderboard_score DESC';
    const results = await executeQuery(selectQuery);
    return results;

  } catch (error) {
    console.error('Error getting leaderboard data:', error);
    throw error;
  }
}

initialize();

module.exports = { submitGame, getLeaderboard };
