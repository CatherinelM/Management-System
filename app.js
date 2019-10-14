/*  
app.js入口模块
职责：
  创建服务
  做一些服务相关配置
     模板引擎
     body-parser解析表单post请求体
     提供静态服务
  挂载路由
  监听端口启动服务
*/

var express = require('express')
//这里容易出错  ./
var router=require('./router')

var app = express()
var bodyParser = require('body-parser')

//开放出来
app.use('/04/code/crud-express/node_modules', express.static('./node_modules/'))
app.use('/04/code/crud-express/public', express.static('./public/'))


app.engine('html', require('express-art-template'));

//注意：
//配置模板引擎和body-parser一定要在app.use（router）挂载之前
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//4.把路由挂载到app服务中
app.use(router)
// router(app)

app.listen(3000, function () {
    console.log('running...')
})

module.exports=app