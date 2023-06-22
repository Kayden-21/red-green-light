const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { dbConnection } = require('./api');
const bouncer = require ('express-bouncer')(900000, 900000, 3);
const getSecrets = require('./getSecrets') 
const hash = require('./hash/hash')

const app = express();
app.use(bodyParser.json());

let jwtToken;

getSecrets.getSecret("prod/redgreenlight/jwt")
.then((secretValue) => {
  jwtToken = secretValue;
})
.catch((error) => {
  console.error("Error retrieving secret:", error);
});

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
app.post('/login', bouncer.block, (req, res) => {
  const { username, password } = req.body;
  
  // Mock user authentication
  const user = users.find((u) => u.username === username && u.password === password);

  //Get encrypyed password from db

  //Compare password from request with encrypted password from db
  // can use this code
  // const doesMatch = await hash.verifyPassword(password,encryptedPassword);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  else {
    bouncer.reset(req);
  }
  
  // Generate JWT token with a secret key
  const token = jwt.sign({ userId: user.id }, jwtToken, { expiresIn: '1h' });
  
  // Return the JWT token to the client
  res.json({ token });
});

app.post('/register', bouncer.block, async (req, res) => {
  const { username, password } = req.body;
  
  //first check if user exists in db

  //if it does encrypt password to be stored
  const encryptedPassword = await hash.encrypt(password);

  //store in db afterwards

});


// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Authentication server is running on port ${port}`);
});
