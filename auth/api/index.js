const mysql = require('mysql');
const config = require('./config.js');

const dbConnection = mysql.createConnection(config);

dbConnection.connect((err) => {
  if (err) {
    return console.error('A travesty has befallen us: ' + err.message);
  }

  console.log('Connected to MySQL.');
});

module.exports = {
  dbConnection,
};
