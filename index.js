const express = require('express');
const app = express();

const mu = require('./MyUtils.js');
const logger = mu.get_logger();

app.get('/', (req, res) => {
  function app_get() {
    res.send('test');
    logger.info('test message 1');
    logger.info('test message 2');
  }
  app_get();
});

app.listen(80, () => {
  console.log('Listening on port 80');
});
