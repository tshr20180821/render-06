const express = require('express');
const app = express();

const mu = require('./MyUtils.js');
const logger = mu.get_logger();

app.get('/', (req, res) => {
  app_get();
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});

app_get() {
  res.send('test');
  logger.info('INFO message 2');
}
