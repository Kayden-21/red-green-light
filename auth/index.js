const express = require('express');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const { dbConnection } = require('./api');
const bouncer = require ('express-bouncer')(900000, 900000, 3);
const getSecrets = require('./getSecrets') 
const hash = require('./hash/hash')
const db = require('./db/db')

const app = express();
app.use(json());

let jwtToken;

// Function to handle bouncer blocked requests
bouncer.blocked = function (req, res, _, remaining) {
    res.status(429).send("Too many requests have been made, please wait " + remaining / 1000 + " seconds");
};

async function initializeJwtToken() {
  try {
    jwtToken = await getSecrets.getSecret("prod/redgreenlight/jwt");
  } catch(error) {
    console.error("Error retrieving secret:", error);
  }
}

initializeJwtToken();

app.post('/login', bouncer.block, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!await db.doesUserExist(username) || !await hash.verifyPassword(password, await db.getUserPassword(username))) {
      return res.status(401).json({ error: 'Invalid User or Credentials' });
    }

    bouncer.reset(req);
    const token = jwt.sign({ userName: username }, jwtToken, { expiresIn: '1h' });
    res.json({ token });
  } catch(error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.post('/register', bouncer.block, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (await db.doesUserExist(username)){
      return res.status(409).json({ error: 'User already exists' });
    }
    await db.registerUser(username, await hash.encrypt(password));
    res.status(200).json({message: 'User created successfully'});
  } catch(error) {
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Authentication server is running on port ${port}`);
});
