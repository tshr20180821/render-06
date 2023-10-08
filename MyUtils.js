class MyLog {
  _regex;
  constructor() {
    this._regex = /.+\/(.+?):(\d+)/;
  }
  
  info(message_) {
    console.log(message_);
    try {
      var e = new Error();
      console.log(e.stack);
      var stack = e.stack.split("\n")[2].substring(7);
      var match = stack.match(this._regex);
      console.log(match);

      var dt = new Date();
      var log_header = dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2) + ' '
        + ('0' + dt.getHours()).slice(-2) + ':' +  ('0' + dt.getMinutes()).slice(-2) + ':' +  ('0' + dt.getSeconds()).slice(-2) + '.'
        + ('00' + dt.getMilliseconds()).slice(-3) + ' ' + process.env.RENDER_EXTERNAL_HOSTNAME + ' ' + process.env.DEPLOY_DATETIME + ' '
        + process.pid + ' INFO ' + match[1] + ' ' + match[2] + ' [';
    } catch (err) {
      console.log(err.toString());
    }
  }
  
  warn(message_) {
    console.log(message_);
  }
}

module.exports.get_logger = function ()
{
  return new MyLog();
}

