class MyLog {
  constructor() {
  }
  
  info(message_) {
    console.log(message_);
  }
  
  warn(message_) {
    console.log(message_);
  }
}
module.exports.MyLog = MyLog;
