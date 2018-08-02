var mongoose = require('mongoose');

// 获取表模型
var Schema = mongoose.Schema;
// 定义一个模型
var note = new Schema({
  "title" : String,
  "content" : String,
  "desc" : String,
  "createAt" : String
});
// 默认匿名输出
// 定义一个Goods模型，基于模型可调用api方法
module.exports = mongoose.model('notelists', note);