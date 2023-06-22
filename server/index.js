const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 4001;
app.listen(port, () => {
  console.log(`Resource server is running on port ${port}`);
});