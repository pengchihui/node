var express=require("express");
var path=require("path");
var fs=require("fs");
var template=require("art-template");



var app=express();
var list={
		name:"张三",
		say:[
			"123465789",
			"abcdefghi",
			"你好！"
		],
		friend:[
			{name:"李四",age:18},
			{name:"王五",age:19},
			{name:"赵六",age:20},
			{name:"赵六",age:20},
			{name:"赵六",age:20},
			{name:"赵六",age:20}
		],
		num:6,
		str:"hello",
		cla:"on",
		bool:false
	}

app.get("/add",function(req,res){
	fs.readFile(path.join(__dirname,"html","index.html"),"utf8",function(err,data){
		if (err) throw err;
	
		var str=template.render(data,list);
		
		res.send(str);
	})
});

// app.use("/",express.static(path.join(__dirname,"img")));
// app.use("/html",express.static(path.join(__dirname,"img")));


app.listen(8080,function(){
	console.log("正在运行")
})