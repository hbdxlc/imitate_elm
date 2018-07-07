var express=require('express');
var router=express.Router();
var mysql  = require('mysql');
var cookies  = require('cookies');
var bodyparser=require('body-parser');
var OptPool=require('../db/OptPool');

var optPool = new OptPool();
var pool = optPool.getPool();

var appData=require('../data.json');
var seller=appData.seller;
var goods=appData.goods;
var ratings=appData.ratings

router.get('/seller',function (req, res) {
    res.json({
        errno:0,
        seller:seller
    })
})
router.get('/goods',function (req, res) {
    res.json({
        errno:0,
        goods:goods
    })
})
router.get('/ratings',function (req, res) {
    res.json({
        errno:0,
        ratings:ratings
    })
})

//统一返回格式
/*var responseData;
router.use(function (req, res,next) {
    responseData={
        code:0,
        message:''
    }
    next();
});
*/



module.exports=router;