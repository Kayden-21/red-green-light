const express = require('express');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const { dbConnection } = require('./api');
const bouncer = require('express-bouncer')(900000, 900000, 20);
const getSecrets = require('./getSecrets') 
const hash = require('./hash/hash')
const db = require('./db/db')
const { check, validationResult } = require('express-validator');
const helmet = require('helmet');

const app = express();
app.use(json());
app.use(helmet());
app.use(helmet.xssFilter());

let jwtToken;

// Function to handle bouncer blocked requests
bouncer.blocked = function (req, res, _, remaining) {
    res.status(429).send("Too many requests have been made, please wait " + remaining / 1000 + " seconds");
};

async function initializeJwtToken() {
  try {
    const jwtObject = await getSecrets.getSecret("prod/redgreenlight/jwt");
    jwtToken = JSON.parse(jwtObject).jwt_token;
  } catch(error) {
    console.error("Error retrieving secret:", error);
  }
}

initializeJwtToken();

app.post('/login', bouncer.block, [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: {errors: errors.array() }});
  }

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

app.post('/register', bouncer.block, [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: {errors: errors.array() }});
  }

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
