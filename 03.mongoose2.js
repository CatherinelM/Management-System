const mongoose = require('mongoose');

//1.连接MongoDB数据库
//指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

//2.设计集合结构（表结构）
//字段名称就是表结构中的属性名称
//约束的目的是为了保证数据的完整性，不要有脏数据

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName:{
        type:String,
        require:true//不允许为空
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String
    }   
  })

  //3.将文档结构发布为模型
  //mongoose.model
  //第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
  //           mongoose会自动将大写名词的字符串生成小写复数的集合
  //           例如这里的User最终会变为users集合名称
  //第二个参数：架构Schema
  //           返回值：模型构造函数
  var User=mongoose.model('User',userSchema)

  //4.当我们有了模型结构构造函数之后，就可以使用这个构造函数对users集合中的数据进行增删改查了
  /* 
  新增数据
   */
//   var admin=new User(
//       {
//           userName:'hao',
//           password:'99999',
//           email:'99999999@qq.com'
//       }
//   )

//   admin.save(function(err,ret){
//       if(err){
//           console.log('保存失败')
//       }else{
//           console.log('保存成功')
//           console.log(ret)
//       }
//   })

/* 
查询数据
 */
// 查询所有
User.find(function(err,ret){
    if(err){
        console.log('查询失败')

    }else{
        console.log('查询成功')
        console.log(ret)
    }
})
//查询单个
// User.find({
//     userName:'ming'
// },function(err,ret){
//     if(err){
//         console.log('查询失败')

//     }else{
//         console.log('查询成功')
//         console.log(ret)
//     }
// })

/* 
删除数据
 */
// User.deleteOne({
//     userName:'ming'
// },function(err,ret){
//     if(err){
//         console.log('删除失败')
//     }else{
//         console.log('删除成功')
//         console.log(ret)
//     }
// })

/* 
更新用户
 */
// User.updateOne({
//     userName:''
// })
// User.findByIdAndUpdate('5d9ed47ebfe20133a4fd7505',{
//     userName:'ChengZhihao'
// },function(err,ret){
//     if(err){
//         console.log('更新失败')
//     }else{
//         console.log('更新成功')
//     }
// })


