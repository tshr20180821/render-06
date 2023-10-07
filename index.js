const express = require('express');
const app = express();

const mu = require('./MyUtils.js');
const logger = mu.get_logger();

app.get('/', (req, res) => {
  res.send('test');
  logger.info('INFO message');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
