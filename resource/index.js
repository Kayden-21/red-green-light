const express = require('express');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('./db/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config({path: '../.env'});

const port = process.env.GAME_PORT || 3000;
const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.GAME_URL,
  methods: ["GET", "POST"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: true, 
    saveUninitialized: true
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.get('/leaderboards', async (req, res) => {
  try {
    const leaderboard = await db.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post('/leaderboards', async (req, res) => {
  try {
    const { username, score } = req.body;
    const success = db.submitGame(username, score);
    if (success) {
      res.status(200).json('Successfully submitted game');
      return;
    }
    res.status(500).json({error:'Error submitting game'});
  } catch (error) {
    return res.status(500).json(error);
  }
});

const authRoute = require('./routes/utilityRoute');
app.use('/Utility', authRoute);

const homeRoute = require('./routes/homeRoute');
app.get('/', (req, res) => {res.redirect('/Home');});
app.use('/Home', homeRoute);
app.get('/Home', homeRoute);
app.post('/Home', homeRoute);

const gameRoute = require('./routes/playRoute');
app.use('/Play', gameRoute);

const leaderboardRoute = require('./routes/leaderboardRoute');
app.use('/Leaderboard', leaderboardRoute);

const loginRoute = require('./routes/loginRoute');
app.use('/Login', loginRoute);
app.post('/Login', loginRoute)
app.get('/Login', loginRoute);

const signupRoute = require('./routes/signupRoute');
app.use('/Signup', signupRoute);

app.use(express.static('scripts'));
app.use(express.static('images'));
app.use(express.static('css'));



const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Game server is running: http://localhost:${port}`);
});
