class MyLog {
  _regex;
  _loggly_options;

  constructor() {
    this._regex = /(.+) .+\/(.+?):(\d+)/;

    this._loggly_options = {
      protocol: 'https',
      port: 443,
      hostname: 'logs-01.loggly.com',
      path: '/inputs/' + process.env.LOGGLY_TOKEN
        + '/tag/' + process.env.RENDER_EXTERNAL_HOSTNAME + ',' + process.env.RENDER_EXTERNAL_HOSTNAME + '_' + process.env.DEPLOY_DATETIME + '/',
      method: 'POST',
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      }
    };
    this._loggly_options.agent = new require('https').Agent({ keepAlive: true });
  }
  
  info(message_) {
    this.#output('INFO', message_);
  }
  
  warn(message_) {
    this.#output(message_);
  }
  
  #output(level_, message_) {
    try {
      
      var e = new Error();
      var stack = e.stack.split("\n")[3].substring(7);
      var match = stack.match(this._regex);

      var dt = new Date();
      var log_header = dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2) + ' '
        + ('0' + dt.getHours()).slice(-2) + ':' +  ('0' + dt.getMinutes()).slice(-2) + ':' +  ('0' + dt.getSeconds()).slice(-2) + '.'
        + ('00' + dt.getMilliseconds()).slice(-3) + ' ' + process.env.RENDER_EXTERNAL_HOSTNAME + ' ' + process.env.DEPLOY_DATETIME + ' '
        + process.pid + ' ' + level_ + ' ' + match[2] + ' ' + match[3] + ' [' + match[1] + ']';
      console.log(log_header + ' ' + message_);
      const request = require('https').request(this._loggly_options);
      request.write(log_header + ' ' + message_);
      request.end();
    } catch (err) {
      console.log(err.toString());
    }
  }
}

module.exports.get_logger = function ()
{
  return new MyLog();
}

