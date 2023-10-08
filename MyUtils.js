class MyLog {
  _regex;
  constructor() {
    this._regex = /^.+?at (.+) .+\/(.+?):(\d+)/;
  }
  
  info(message_) {
    this.#output('INFO', message_);
  }
  
  warn(message_) {
    this.#output(message_);
  }
  
  #output(level_, message_) {
    console.log(message_);
    try {
      var e = new Error();
      console.log(e.stack);
      var stack = e.stack.split("\n")[3].substring(7);
      var match = stack.match(this._regex);
      console.log(match);

      var dt = new Date();
      var log_header = dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2) + ' '
        + ('0' + dt.getHours()).slice(-2) + ':' +  ('0' + dt.getMinutes()).slice(-2) + ':' +  ('0' + dt.getSeconds()).slice(-2) + '.'
        + ('00' + dt.getMilliseconds()).slice(-3) + ' ' + process.env.RENDER_EXTERNAL_HOSTNAME + ' ' + process.env.DEPLOY_DATETIME + ' '
        + process.pid + ' ' + level_ + ' ' + match[2] + ' ' + match[3] + ' [' + match[1] + ']';
      console.log(log_header + ' ' + message_);
    } catch (err) {
      console.log(err.toString());
    }
  }
}

module.exports.get_logger = function ()
{
  return new MyLog();
}

