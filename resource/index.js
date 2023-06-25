const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
const app = express();

const homeRoute = require('./routes/homeRoute');
app.use('/Home', homeRoute);

const gameRoute = require('./routes/playRoute');
app.use('/Play', gameRoute);

const leaderboardRoute = require('./routes/leaderboardRoute');
app.use('/Leaderboard', leaderboardRoute);

const loginRoute = require('./routes/loginRoute');
app.use('/Login', loginRoute);
app.get('/', (req, res) => {res.redirect('/Login');});

const signupRoute = require('./routes/signupRoute');
app.use('/Signup', signupRoute);

app.use(express.static('scripts'));
app.use(express.static('images'));
app.use(express.static('css'));

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`listening on https://localhost:${port}`);
});