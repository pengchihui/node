var express=require("express");


var mongoose=require("mongoose");

var Schema=mongoose.Schema;

mongoose.connect("mongodb://localhost/user")//数据库不存在则创建

var People=new Schema({
	name:{
		type:String,//设置数据类型
		required:true//设置必填选项
	},
	age:Number,
	birthday:Date,
	img:String,
	friend:[String,String],
	alive:Boolean	
})

var Man=mongoose.model("student",People);

var app=express();
app.get("/",function(req,res){
	
for(var i=0;i<50;i++){
	
var one=new Man({
	name:"张三"+i,
	age:18+i,
	friend:["李四","王五"]
})
one.save();	

}

	
res.send("存储成功")


		
});

app.use("/search",function(req,res){
	// Man.find(req.query).then(function(val){
	// 	res.send(val)
	// })
	
	Man.deleteOne({name:"张三29"}).then(function(){
		console.log("删除成功")
	})
	
	Man.find({age:{$lte:req.query.age}}).then(function(val){
		res.send(val)
	})	
	
})




app.listen(8080,function(){
	console.log("正在运行")
})
