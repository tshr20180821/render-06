class MyLog {
  _regex;
  _request;
  constructor() {
    this._regex = /(.+) .+\/(.+?):(\d+)/;

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      }
    };
    options.agent = new require('https').Agent({ keepAlive: true });
    this._request = require('https').request('https://logs-01.loggly.com/inputs/' + process.env.LOGGLY_TOKEN
                                             + '/tag/' + process.env.RENDER_EXTERNAL_HOSTNAME + ',' + process.env.RENDER_EXTERNAL_HOSTNAME + '_' + process.env.DEPLOY_DATETIME + '/',
                                             options
                                             });
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
      this._request.write(log_header + ' ' + message_);
      // this._request.end();
    } catch (err) {
      console.log(err.toString());
    }
  }
}

module.exports.get_logger = function ()
{
  return new MyLog();
}

