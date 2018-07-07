var express=require('express');
var router=express.Router();
var mysql  = require('mysql');
var cookies  = require('cookies');
var bodyparser=require('body-parser');
var OptPool=require('../db/OptPool');

var optPool = new OptPool();
var pool = optPool.getPool();


//判断是否登录
router.use(function (req, res, next) {
    if(req.cookies.get('userinfo')==undefined){
        res.render('login',{
            title:'登录'
        })
        return;
    }
    next();
})



//统一返回格式
var responseData;
router.use(function (req, res,next) {
    responseData={
        code:0,
        message:''
    }
    next();
});
//进入后台
router.get('/',function (req, res) {
    var userinfo=JSON.parse(req.cookies.get('userinfo'));
    res.render('main',{
        title:'后台管理系统',
        username:userinfo.name
    })
})
//栏目设置获取上级栏目
router.get('/SetSell',function (req, res) {
    var sql = "SELECT * FROM sys_category";
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
                res.render('setColumn',{
                title:'添加栏目',
                data:result
            })
        })
        conn.release();
    })

})
//保存新增栏目
router.post('/NewNav',function (req, res) {
    var parentId = req.body.parentId;
    var name = req.body.name;
    var href = req.body.href;
    var in_menu = req.body.in_menu;
    var myDate=new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var date=myDate.getDate();
    var create_by=year+'-'+month+'-'+date;

    if(name==''||href==''||in_menu==''){
        responseData.code=1;
        responseData.message='填写内容不全,请仔细填写!';
        res.json(responseData);
        return;
    }else {
        var  sql = 'INSERT INTO sys_category(parent_id,name,href,in_menu,create_by) VALUES(?,?,?,?,?)';
        var  addsql = [parentId,name,href,in_menu,create_by];
         pool.getConnection(function (err, conn) {
            conn.query(sql,addsql, function (err, result) {
                if (err) {
                    console.log('[query] - :' + err);
                    return;
                }
                responseData.code=1;
                responseData.message='添加成功!';
                res.json(responseData);
                return;
            })
            conn.release();
        })

    }
})
//栏目管理
router.get('/lmgl',function (req, res) {
    var sql = 'SELECT * FROM sys_category WHERE del_flag = "0"';
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            res.render('lmgl',{
                title:'栏目管理',
                data:result
            })
        })
        conn.release();
    })

})
//栏目删除
router.post('/lmgl/sc',function (req, res) {
    var parentId = req.body.parentId;
    var sql ="UPDATE sys_category SET del_flag='1' WHERE id="+parentId;
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            responseData.code=1;
            responseData.message='删除成功!';
            res.json(responseData);
            return;
        })
        conn.release();
    })

})
//栏目修改
router.get('/lmgl/xg',function (req, res) {
    var parentId=req.query.parentId || '';
    var sql ="SELECT * FROM sys_category";
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, data) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            var sql = "SELECT * FROM sys_category WHERE id=" + parentId;
            pool.getConnection(function (err, conn) {
                conn.query(sql, function (err, result) {
                    if (err) {
                        console.log('[query] - :' + err);
                        return;
                    }
                    res.render('lmxg', {
                        title: '栏目修改',
                        data: result,
                        result: data
                    })
                })
                conn.release();
            })
        })
    })
})
//栏目修改保存
router.post('/lmgl/xg/bc',function (req, res) {
    var parentId = req.body.parentId;
    var id = req.body.id;
    var name = req.body.name;
    var href = req.body.href;
    var in_menu = req.body.in_menu;
    var myDate=new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var date=myDate.getDate();
    var create_by=year+'-'+month+'-'+date;

    var sql ="UPDATE sys_category SET parent_id='"+parentId+"',`name`='"+name+"',href='"+href+"',in_menu='"+in_menu+"',create_by='"+create_by+"' WHERE id='"+id+"'";
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            responseData.code=1;
            responseData.message='修改成功!';
            res.json(responseData);
            return;
        })
        conn.release();
    })
})
//添加内容
router.get('/addcontent',function (req, res) {
    var sql = 'SELECT * FROM sys_category WHERE del_flag = "0"';
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            res.render('addcontent',{
                title:'添加文章',
                data:result
            })
        })
        conn.release();
    })
})
//保存文章
router.post('/addcontent/add',function (req, res) {
    var categoryId = req.body.parentId;
    var title = req.body.title;
    var content=req.body.content;
    var userinfo=JSON.parse(req.cookies.get('userinfo'));
    var create_by=userinfo.name;
    var myDate=new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var date=myDate.getDate();
    var create_date=year+'-'+month+'-'+date;

    var  sql = 'INSERT INTO cms_article(category_id,title,content,create_by,create_date) VALUES(?,?,?,?,?)';
    var  addsql = [categoryId,title,content,create_by,create_date];


    pool.getConnection(function (err, conn) {
        conn.query(sql,addsql,function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            responseData.code=1;
            responseData.message='添加成功!';
            res.json(responseData);
            return;
        })
        conn.release();
    })
})
//内容列表
router.get('/contentlist',function (req, res) {
    var sql = 'SELECT a.*, b.`name` FROM cms_article a LEFT JOIN sys_category b ON a.category_id = b.id WHERE a.del_flag = 0';
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            res.render('contentlist', {
                title: '文章列表',
                data:result
            })
        })
    })
})
module.exports=router;