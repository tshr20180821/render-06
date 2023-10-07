class MyLog {
  constructor() {
  }
  
  info(message_) {
    console.log(message_);
    try {
      var e = new Error();
      var stack = e.stack.split("\n")[2];
      console.log(stack);
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

