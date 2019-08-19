var http=require("http");
var fs=require("fs");
var path=require("path");
var template=require("art-template");



http.createServer(function(req,res){
	
	// var str=template.render("<h2>{{tit}}</h2><p>{{test}}</p>",{tit:"标题",test:"123456789"})
	// console.log(str);
	// res.setHeader( 'Content-Type', 'text/html;charset=utf-8');
	// res.end(str)
	
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
		
		
	if(req.url=="/"){
		fs.readFile(path.join(__dirname,"html","index.html"),"utf8",function(err,data){
			if (err) throw err;

			var str=template.render(data,list);
			
			res.end(str);
		})
	}	
		
		
}).listen("8080","localhost",function(){
	console.log("服务已经运行，请打开http://localhost:8080查看")
})