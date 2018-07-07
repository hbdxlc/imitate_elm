var express=require('express');
var router=express.Router();
var mysql  = require('mysql');
var cookies  = require('cookies');
var bodyparser=require('body-parser');
var OptPool=require('../db/OptPool');

var optPool = new OptPool();
var pool = optPool.getPool();

//统一返回格式
var responseData;
router.use(function (req, res,next) {
    responseData={
        code:0,
        message:''
    }
    next();
});


router.post('/user/login',function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    //验证密码和用户名是否为空
    if (username == "" || password == "") {
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }
    //查询数据库数据数据
    var sql = "SELECT * FROM sys_user WHERE username='" + username + "' AND password='" + password + "'";
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            //如果返回数据为空
            if (result == '') {
                responseData.code = 2;
                responseData.message = '用户名或密码错误';
                res.json(responseData);
                return;
            }
            //账号密码为正确的时候
            responseData.code = 3;
            responseData.message = '数据请求成功';
            responseData.userinfo = {
                username: result[0].username,
                _id: result[0].id
            };
            //中文编码解析
            var GB2312UnicodeConverter = {
                ToUnicode: function (str) {
                    return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
                }
                , ToGB2312: function (str) {
                    return unescape(str.replace(/\\u/gi, '%u'));
                }
            };
            var str = result[0].username, unicode;
            unicode = GB2312UnicodeConverter.ToUnicode(str);
            req.cookies.set('userinfo', '{"id":"' + result[0].id + '","name":"' + unicode + '"}');
            conn.release(); //放回连接池
            res.json(responseData);
            return;

        });
    })
})

//退出
router.get('/user/logout',function (req, res) {
    req.cookies.set("userinfo",null);
    responseData.code=1;
    responseData.message='退出成功';
    res.json(responseData);
    return;
})


module.exports=router;