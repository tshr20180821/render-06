class MyLog {
  regex;
  constructor() {
    regex = /'.+\/(.+?):(\d+)'/;
  }
  
  info(message_) {
    console.log(message_);
    try {
      var e = new Error();
      var stack = e.stack.split("\n")[2].substring(7);
      var match = stack.match(regex);
      console.log(match);
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

