
/* 
router.js
职责：
   处理路由
   根据不同的请求方式+请求路径设置具体的请求处理函数
 */

// module.exports=function(app){

var fs = require('fs')
var Student=require('./student')
//Express提供了一种更好的方法
//专门用来包装路由的
var express=require('express')

//1.创建一个路由容器
var router=express.Router()

//2.把路由挂载到router路由容器中
router.get('/students', function (req, res) {   
    // fs.readFile('./db.json', 'utf8', function (err, data) {  
    //     if (err) {
    //         return res.status(500).send('Server error')
    //     }
    //     //从文件中读取的数据一定是字符串所以这里一定要手动转成对象
    //     res.render('index.html', {
    //         fruits: [
    //             '苹果',
    //             '香蕉',
    //             '橘子',
    //             '火龙果'
    //         ], 
    //         students: JSON.parse(data).students  
    //     })       
    // })   
/* 
 渲染学生列表页面
*/
    Student.find(function(err,students){
        if (err) {
            return res.status(500).send('Server error')
        }
        // var students=JSON.parse(data).students
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '橘子',
                '火龙果'
            ], 
            students: students  
        }) 

    })
 })

router.get('/students/new', function (req, res){
   res.render('new.html')
 })

 /* 
 处理添加学生
 */
router.post('/students/new', function (req, res){
  //1.获取表单数据
  //2.处理
  //  将数据保存到db.json文件中用以持久化
  //3.发送响应
  //  先读取出来，转成对象
  //  然后往对象中push数据
  //  然后把对象转为字符串
  //  然后把字符串再次写入文件

//   console.log(req.body)

new Student(req.body).save(function(err){
    if (err) {
        return res.status(500).send('Server error')
    }
    res.redirect('/students')
})
})
/* 
渲染编辑学生页面
 */
router.get('/students/edit', function (req, res){

    //1.在客户端的列表页中处理链接问题（需要有id参数）
    //2.获取要编辑的学生id
    //3.渲染编辑页面
    //  根据id把学生信息查出来
    //  使用模板引擎渲染页面

    Student.findById(req.query.id,function(err,student){
        if (err) {
            return res.status(500).send('Server error')
        }
        res.render('edit.html',{
            student:student
        })
    })
})

/* 
处理编辑学生页面
 */

router.post('/students/edit', function (req, res){
    //1.获取表单数据
    //  req.body
    //2.更新
    //  Student。updateById()
    //3.发送响应
   Student.findByIdAndUpdate(req.body.id,req.body,function(err){
    if (err) {
        return res.status(500).send('Server error')
    }
    res.redirect('/students')
})

})

/* 
处理删除学生
 */

router.get('/students/delete', function (req, res){
    //1.获取要删除的id
    //2.根据id执行删除操作
    //3.根据操作结果发送响应数据
    // console.log(req.query.id)

    Student.findByIdAndDelete(req.query.id,function(err){
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

//3.把router导出
module.exports=router

// }
