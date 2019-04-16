var express = require('express');
var router = express.Router();

//引入连接模块
const connection = require('./js/connectMysql');



/* 写一个路由 统一设置响应头 */ 
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
	// 放行
	next();
})
// 准备一个签名（秘钥）
const secretKey = 'itsource';

/* 验证token的合法性 */
const expressJwt = require('express-jwt');

//验证token的合法性
router.use(expressJwt ({
            secret: secretKey
}).unless({
    path: ['/login/checklogin']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
})
//添加账号路由
router.post('/accountadd',(req,res) => {
    //解构前端传来的数据
    let { account, password, userGroup } = req.body;
    let imgUrl = '/upload/default.jpg'; // 默认头像
    //sql语句
    const sqlStr = `insert into account(account, password, user_group, img_url) values('${account}', '${password}', '${userGroup}', '${imgUrl}')`;

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
    
	// 构造sql
    let sqlStr = `select * from account order by create_date desc`;
    
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 计算数据总条数
		let total = data.length;
        
		// 计算跳过多少条
		let n = (currentPage - 1) * pageSize;
		// 拼接分页sql
		sqlStr += ` limit ${n}, ${pageSize}`;
        
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
    connection.query(sqlStr,(err, data) => {
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
    connection.query(sqlStr,(err,data) => {
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
/* 检查旧密码 */ 
router.post('/passwordmodify', (req, res) => {
	// 接收前端传过来的用户输入的旧密码
	let { oldPassword } = req.body;
	// 获取当前登录的用户密码
    let { password } = req.user;
    
    // 判断
    if (password === oldPassword) {
    	res.send({code: 0, reason: '原密码输入正确'})
    } else {
		res.send({code: 1, reason: '原密码输入错误'})
    }
})

/* 修改密码 */ 
router.post('/savenewpassword', (req, res) => {
	// 接收新密码
	let { newPassword } = req.body;
	// 获取当前登录用户的id
	let { id } = req.user;
   console.log(newPassword,id)
	// 构造sql
	const sqlStr = `update account set password='${newPassword}' where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '密码修改成功，请重新登录！'})
		} else {
			res.send({code: 1, reason: '密码修改失败！'})
		}
	})
})
/* ----------------- 上传后端配置 开始 -------------- */ 

// 引入multer
const multer = require('multer')

// 配置上传到服务器放置的目录 和 重命名
const storage = multer.diskStorage({
	destination: 'public/upload', // 图片上传到服务器的这个目录
	  // 图片重命名
    filename (req, file, cb) {
        var fileFormat =(file.originalname).split("."); // haha.jpg => ['haha', 'jpg']
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
})

// 上传对象
const upload = multer({
    storage,
});
/* 个人信息 */ 
router.get('/accountinfo', (req, res) => {
	// 获取当前登录用户的id
	const id = req.user.id;
	const sqlStr = `select * from account where id=${id}`;
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data)
	})
})
/* ----------------- 上传后端配置 结束-------------- */ 

/* 头像上传请求 */ 
router.post('/uploadavatar', upload.single('file'), (req, res) => {
	// 获取文件名
	let filename = req.file.filename;
	// 拼接路径
	let path = `/upload/${filename}`;

	// 构造sql
	const sqlStr = `update account set img_url='${path}' where id=${req.user.id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: "头像修改成功!", path})
		} else {
			res.send({code: 1, reason: "头像修改失败"})
		}
	})
})

module.exports = router;

