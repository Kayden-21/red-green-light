const mysql = require('mysql');
const config = require('./config.js');

const dbConnection = mysql.createConnection(config);

dbConnection.connect((err) => {
  if (err) {
    return console.error('A travesty has befallen us: ' + err.message);
  }

  console.log('Connected to MySQL.');
});

const scripts = [
  'CREATE DATABASE IF NOT EXISTS authdatabase',
  'CREATE DATABASE IF NOT EXISTS gamedatabase',
  'USE authdatabase',
  `CREATE TABLE IF NOT EXISTS login (
    login_id INT AUTO_INCREMENT,
    login_username VARCHAR(255),
    login_password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(login_id)
  )`,
  `INSERT INTO login (login_username, login_password) 
    VALUES 
      ('user', 'userpass'),
      ('kyle', 'kylepass'),
      ('matt', 'mattpass')`,
  'USE gamedatabase',
  `CREATE TABLE IF NOT EXISTS leaderboard (
    leaderboard_id INT AUTO_INCREMENT,
    leaderboard_username VARCHAR(255), 
    leaderboard_score INT,
    PRIMARY KEY(leaderboard_id)
  )`,
  `INSERT INTO leaderboard (leaderboard_username, leaderboard_score)
    VALUES
      ('user', 16),
      ('matt', 24),
      ('kyle', 102)`
];

let succeeded = true;

for (const script of scripts) {
  
  dbConnection.query(script, function (err, results, fields) {
    if (err) {
      console.log(`A travesty has befallen us: ${err.message}`);
      succeeded = false;
      return;
    }
  });
}

if (succeeded) {
  console.log('Successfully created database')
}

dbConnection.end(function (err) {
  if (err) {
    return console.log(err.message);
  }
});