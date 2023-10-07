const express = require('express');
const app = express();

const mu = require('./MyUtils.js');
const myLog = mu.MyLog;

app.get('/', (req, res) => {
  res.send('test');
  const logger = new myLog();
  logger.info('INFO message');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
