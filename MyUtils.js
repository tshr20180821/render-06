class MyLog {
  constructor() {
  }
  
  info(message_) {
    console.log(message_);
    let e = new Error();
    console.log(e.stack);
  }
  
  warn(message_) {
    console.log(message_);
  }
}

module.exports.get_logger = function ()
{
  return new MyLog();
}

