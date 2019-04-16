var express = require('express');
var router = express.Router();

//引入连接模块
const connection = require('./js/connectMysql');



/* 写一个路由 统一设置响应头 */ 
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
    res.setHeader("Access-Control-Allow-Headers", "authorization"); 
	// 放行
	next();
})

//存入商品数据
//添加账号路由
router.post('/goodsadd',(req,res) => {
    //解构前端传来的数据
    let { classification, goodBarCode, goodname, salePrice, marketPrice, purchasePrice, inventoryQuantity, goodWeight, 
    goodUnit, memberDiscount, promotion, description } = req.body;
    
    //sql语句
    const sqlStr = `insert into goods(classification, goodBarCode, goodname,salePrice,marketPrice, 
        purchasePrice, inventoryQuantity, goodWeight, goodUnit, memberDiscount, promotion, description ) 
        values('${classification}', '${goodBarCode}', '${goodname}', '${salePrice}', '${marketPrice}', '${purchasePrice}'
        , '${inventoryQuantity}', '${goodWeight}', '${goodUnit}', '${memberDiscount}', '${promotion}', '${description}')`;

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

//获取商品列表
router.get('/goodslist', (req,res) => {
    let { currentPage, pageSize, cateName, keyword } = req.query;
    
    let sqlStr = `select * from goods where 1=1`;
	// 构造sql
    // 如果cateName为空或全部  代表查询所有分类  否则就是按照分类查询
	if (cateName !== '全部' && cateName !== '') {
		sqlStr += ` and classification='${cateName}'`;
	}
    // 如果kewword为空就是查询所有名称或条形码 否则 就是查询条形码或名称包含关键字的
	if (keyword !== '') {
		sqlStr += ` and(goodName like '%${keyword}%' or goodBarCode like '%${keyword}%')`
    }
    // 拼接排序
	sqlStr += ` order by ctime desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
        if (err) throw err;
       // 查询结果条数
		let total = data.length; // 查询结果的total

		// 构造分页sql
		let n = (currentPage - 1) * pageSize;
		sqlStr += ` limit ${n}, ${pageSize}`;

		// 执行分页sql
		connection.query(sqlStr, (err, data) => {
			if (err) throw err;
			res.send({total, data})
		})
	})
})

module.exports = router;

