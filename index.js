const express = require('express');
const app = express();

const mu = require('./MyUtils.js');
const logger = mu.get_logger();
const myLog = mu.MyLog;

app.get('/', (req, res) => {
  res.send('test');
  const mylogger = new myLog();
  mylogger.info('INFO message');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
