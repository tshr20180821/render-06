const express = require('express');
const app = express();

const mu = require('./MyUtils.js');
const myLog = me.MyLog;

app.get('/', (req, res) => {
  res.send('test');
  var logger = new myLog();
  logger.info('INFO message');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
