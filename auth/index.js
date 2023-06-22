const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { dbConnection } = require('./api');
var bouncer = require ("express-bouncer")(900000, 900000, 3);

const app = express();
app.use(bodyParser.json());

console.log(dbConnection);

bouncer.blocked = function (req, res, next, remaining)
{
    res.status(429, "Too many requests have been made, " +
        "please wait " + remaining / 1000 + " seconds");
};

// Mock database for demo purposes
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];


// Authentication endpoint
app.post('/auth', bouncer.block, (req, res) => {
  const { username, password } = req.body;
  
  // Mock user authentication
  const user = users.find((u) => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  else {
    bouncer.reset(req);
  }
  
  // Generate JWT token with a secret key
  const token = jwt.sign({ userId: user.id }, '6b9d56e33e9428a65a669bde925193d588b2657c', { expiresIn: '1h' });
  
  // Return the JWT token to the client
  res.json({ token });
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Authentication server is running on port ${port}`);
});
