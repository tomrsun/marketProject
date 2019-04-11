var express = require('express');
var router = express.Router();

//引入连接模块
const connextion = require('./js/connectMysql');
/* 写一个路由 统一设置响应头 */ 
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
	// 放行
	next();
})
//添加账号路由
router.post('/accountadd',(req,res) => {
    //解构前端传来的数据
    let { account, password, userGroup } = req.body;

    //sql语句
    const sqlStr = `insert into account(account, password, user_group) values('${account}', '${password}', '${userGroup}')`;

    //将数据存入数据库
    connextion.query(sqlStr, (err,data) => {
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({ code: 0, reason:'请求数据成功'});
        }else{
            res.send({ code: 1, reason:'请求数据失败'});
        }
    })
})

//获取账号列表路由
router.get('/accountlist', (req,res) => {
    //sql语句
    const sqlStr = `select * from account order by create_date desc`;

    connextion.query(sqlStr, (err, data) => {
        if(err) throw err;
        res.send(data);
    })
})
module.exports = router;

