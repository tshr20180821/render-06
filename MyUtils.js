module.exports.get_logger = function ()
{
  return null;
}

module.exports.MyLog = class MyLog {
  constructor() {
  }
  
  info(message_) {
    console.log(message_);
  }
  
  warn(message_) {
    console.log(message_);
  }
}
// module.exports.MyLog = MyLog;
