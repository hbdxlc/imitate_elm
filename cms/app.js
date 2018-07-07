//加载中间件
var express=require("express");
var swig=require('swig');
var bodyparser=require('body-parser');
var Cookies=require('cookies');
var mysql=require('mysql');

var OptPool=require('./db/OptPool');

var optPool = new OptPool();
var pool = optPool.getPool();

//创建app应用
var app=express();

//设置静态文件托管
app.use('/public',express.static(__dirname+"/public"));

//配置应用模板
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
//设置响应头
app.all('*',function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
//开发环境清除缓存（部署时删除有利于网页加载）
swig.setDefaults({cache:false});

//bodyparser设置
app.use(bodyparser.urlencoded({extended:true}));


//设置cookies
app.use(function (req,res,next) {
    req.cookies=new Cookies(req,res);
    req.userinfo={};
    if(req.cookies.get('userinfo')){
        try{
            req.userinfo=JSON.parse(req.cookies.get('userinfo'));
        }catch (e){
            next();
        }
    }
    next();
});


/*根据不同的功能划分不同模块*/
app.use('/admin',require('./routers/admin'));//api接口
app.use('/api',require('./routers/api'));//后台ajax
app.use('/',require('./routers/main'));//后台逻辑

//连接数据库

pool.getConnection(function (err, conn) {
    conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) {
            console.log('数据库连接失败');
        }else {
            console.log('已经启动9999端口');
            app.listen(9999);
        }
    })
})