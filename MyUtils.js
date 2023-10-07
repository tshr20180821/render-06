class MyLog {
  constructor() {
  }
  
  info(message_) {
    console.log(message_);
    try {
      let e = new Error();
      console.log(e.stack);
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

