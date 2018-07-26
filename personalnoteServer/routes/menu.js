var express = require('express');
var router = express.Router();

// 要操作数据库，要获取mongoose对象
var mongoose = require('mongoose');
// 获取模型
var Menu = require('../models/menu');
// 链接mongoose数据库
mongoose.connect('mongodb://127.0.0.1:27017/personalNote');
// 监听连接状态
mongoose.connection.on('connected', function(){
  console.log('链接成功')
});
mongoose.connection.on('error', function(){
  console.log('链接失败')
});
mongoose.connection.on('disconnected', function(){
  console.log('断开')
});

// 访问 menu二级目录

router.get('/list', function(req, res, next) {
  // 通过模型查询
  // 第一个是查找参数，第二个是回调
  let params = {};
  // 计算跳过多少条
  // let skip = (page-1)*pageSize;

  // Goods.find({})会返回一个模型，模型中有很多封装好的方法
  // limit是至少几条
  let goodsModel = Menu.find(params);
  // goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function(err, doc) {
    if(err) {
      res.json({
        status: 400,
        msg: err.message
      })
    } else {
      res.json({
        status:200,
        msg: '',
        result:{
          count: doc.length,
          list: doc
        }
      })
    }
  });
});

module.exports = router;
