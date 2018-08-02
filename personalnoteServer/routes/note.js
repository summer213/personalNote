var util = require('../public/util.js');

var express = require('express');
var router = express.Router();

// 要操作数据库，要获取mongoose对象
var mongoose = require('mongoose');
// 获取模型
var Note = require('../models/note');
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

// 访问 note二级目录
router.get('/list', function(req, res, next) {
  // 通过模型查询
  // 第一个是查找参数，第二个是回调
  let params = {};
  if (req.query.id) {
    params = {
      _id: req.query.id
    }
  } else {
    params= {}
  }
  // 计算跳过多少条
  // let skip = (page-1)*pageSize;

  // Goods.find({})会返回一个模型，模型中有很多封装好的方法
  // limit是至少几条
  let noteModel = Note.find(params);
  // goodsModel.sort({'salePrice':sort});
  noteModel.exec(function(err, doc) {
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

// 新增笔记
router.post('/create', function(req, res, next) {
  // 通过模型查询
  // 第一个是查找参数，第二个是回调
  req = req.body;
  let date = new Date();
  let createAt = util.DateFormat(Date.parse(date));
  let add_prams = {
    title: req.title,
    content: req.content,
    desc: req.desc,
    createAt: createAt
  }
  let params = {};
  let noteModel = Note.find(params);
  noteModel.exec(function(err, doc) {
      var newNote = new Note(add_prams)
      newNote.save(function(err, doc){
          if(err) {
            res.json({
              code: 400,
              msg: err.message
            })
          } else {
            res.json({
              code:200,
              msg: '',
              data:{
                count: doc.length,
                list: doc
              }
            });
          };
      });
  });
});

// 删除笔记
router.post('/delete', function(req, res, next) {
  // 通过模型查询
  // 第一个是查找参数，第二个是回调
  req = req.body;
  let params = {
    _id: req.id
  };
  let noteModel = Note.find(params);
  noteModel.remove(function(err, doc) {
    if(err) {
      res.json({
        code: 400,
        msg: err.message
      })
    } else {
      res.json({
        code:200,
        msg: '',
        data:{
          count: doc.length,
          list: doc
        }
      });
    };
  });
});

// 修改笔记
router.post('/edit', function(req, res, next) {
  // 通过模型查询
  // 第一个是查找参数，第二个是回调
  req = req.body;
  let params = {
    _id: req.id
  }
  let edit_prams = {
    title: req.title,
    content: req.content,
    desc: req.desc
  }
  let noteModel = Note.find(params);
  noteModel.update(edit_prams, function(err, doc) {
    if(err) {
      res.json({
        code: 400,
        msg: err.message
      })
    } else {
      res.json({
        code:200,
        msg: '',
        data:{
          count: doc.length,
          list: doc
        }
      });
    };
  });
});

module.exports = router;
