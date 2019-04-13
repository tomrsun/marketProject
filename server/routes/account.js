var express = require('express');
var router = express.Router();

//引入连接模块
const connection = require('./js/connectMysql');
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
    connection.query(sqlStr, (err,data) => {
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
	let {currentPage, pageSize} = req.query;
    console.log(currentPage, pageSize)
	// 构造sql
    let sqlStr = `select * from account order by create_date desc`;
    
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 计算数据总条数
		let total = data.length;
        console.log(total)
		// 计算跳过多少条
		let n = (currentPage - 1) * pageSize;
		// 拼接分页sql
		sqlStr += ` limit ${n}, ${pageSize}`;
        console.log(sqlStr)
		// 执行sql
		connection.query(sqlStr, (err, data) => {
			if (err) throw err;
			// 把数据总条数和每个页码对应的数据发送给前端
			res.send({total, data})
		})
	})
})

//删除账号路由
router.get('/accountdel', (req,res) => {
    //获取前端传来的id
    let { id } = req.query;
    
    //编写sql语句
    const sqlStr = `delete from account where id=${id}`;
    //执行sql
    n.query(sqlStr,(err, data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({ code: 0, reason: '删除数据成功！' })
        }else{
            res.send({ code: 1, reason: '删除数据失败！' })
        }
    })
})

//数据回填
router.get("/editaccount",(req,res) => {
    let { id } = req.query;

    //sql
    const sqlStr = `select * from account where id=${id}`;
    n.query(sqlStr,(err,data) => {
        if(err) throw err;
        res.send(data);
    })
})

//保存修改
router.post('/saveeditaccount',(req,res) => {
    let { id, account, userGroup } = req.body;
    
    const sqlStr = `update account set account='${account}',user_group='${userGroup}' where id=${id}`;
    //执行sql
    
    connection.query(sqlStr, (err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code: 0, reason:'修改成功！'})
        }else{
            res.send({code:1, reason:'修改失败！'})
        }
    })
})

//批量删除
router.get('/batchdel',(req,res) => {
    let { idArr } = req.query;

    //sql
    const sqlStr = `delete from account where id in (${idArr})`;
    
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if (data.affectedRows > 0) {
			res.send({code: 0, reason: '批量删除成功!'})
		} else {
			res.send({code: 1, reason: '批量删除失败!'})
		}
    })
})


module.exports = router;

