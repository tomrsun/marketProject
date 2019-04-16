var express = require('express');
var router = express.Router();
// 引入数据库模块
const connection = require('./js/connectMysql');

//引入jsonwebtoken
const jwt = require('jsonwebtoken');

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



/* 检查用户名和密码是否正确 */
router.post('/checklogin', (req, res) => {
	// 接收数据
	let {account, password} = req.body;

	// 构造sql
	const sqlStr = `select * from account where account='${account}' and password='${password}'`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 如果查询有数据 证明这个账号存在
		if (data.length) {
            
			// // 生成token 把token和数据一起响应给前端
 			const token = jwt.sign(Object.assign({}, data[0]),secretKey, { expiresIn:  60*60*2 } )

			res.send({code: 0, reason: '欢迎您！登录成功！',token})
		} else {
			res.send({code: 1, reason: '登录失败，请检查账号或密码！'})
		}
	})
})

/* 用户角色 */ 
router.get('/menus', (req, res) => {
	// 获取用户组
	let userGroup = req.user.user_group;

	let role = userGroup === '超级管理员' ? 'super' : 'normal';

	let menus =  [
                // 系统管理
                {
                    iconClass: 'el-icon-document',
                    title: '系统管理',
                    roles: ['super', 'normal'],
                    children: [     // 子菜单
                        {path: '/home/systeminfo', subTitle: '系统信息'}
                    ]
                },
                // 账号管理
                {
                    iconClass: 'el-icon-news',
                    title: '账号管理',
                     roles: ['super'],
                    children: [
                         {path: '/home/accountmanage', subTitle: '账号管理'},
                         {path: '/home/accountadd', subTitle: '添加账号'},
                         {path: '/home/passwordmodify', subTitle: '密码修改'}
                    ]
                },
                // 商品管理
                {
                    iconClass: 'el-icon-goods',
                    title: '商品管理',
                     roles: ['super', 'normal'],
                    children: [
                        {path: '/home/goodsmanage', subTitle: '商品管理'},
                        {path: '/home/goodsadd', subTitle: '添加商品'},
                    ]
                },
                // 统计管理
                {
                    iconClass: 'el-icon-edit-outline',
                    title: '统计管理',
                     roles: ['super'],
                    children: [
                        {path: '/home/salestotal', subTitle: '销售统计'},
                        {path: '/home/stocktotal', subTitle: '进货统计'},
                    ]
				},
				 // 进货管理
				 {
                    iconClass: 'el-icon-edit-outline',
                    title: '进货管理',
                     roles: ['super','normal'],
                    children: [
                        {path: '/home/stockmanage', subTitle: '库存管理'},
                        {path: '/home/stockadd', subTitle: '添加库存'},
                    ]
				},
				 // 出货管理
				 {
                    iconClass: 'el-icon-edit-outline',
                    title: '出货管理',
                     roles: ['super','normal'],
                    children: [
                        {path: '/home/shipmentlist', subTitle: '销售列表'},
						{path: '/home/commodityship', subTitle: '商品出货'},
						{path: '/home/commodityreject', subTitle: '商品退货'},
                    ]
				},
				 // 会员管理
				 {
                    iconClass: 'el-icon-edit-outline',
                    title: '进货管理',
                     roles: ['super','normal'],
                    children: [
                        {path: '/home/membermanage', subTitle: '账号管理'},
                        {path: '/home/memberadd', subTitle: '添加账号'},
                    ]
                }
            ]

   
    let accessMenu = menus.filter(item => item.roles.includes(role))

	res.send({accessMenu})
})

module.exports = router;
