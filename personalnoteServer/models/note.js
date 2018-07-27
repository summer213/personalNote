var mongoose = require('mongoose');

// 获取表模型
var Schema = mongoose.Schema;
// 定义一个模型
var note = new Schema({
  "deep" : String,
  "name" : String,
  "class" : String
});
// 默认匿名输出
// 定义一个Goods模型，基于模型可调用api方法
module.exports = mongoose.model('notelists', note);