// 加载http模块
var http=require("http");

// 创建服务请求(必有两个参数：请求和响应)
var app=http.createServer(function(req,res){
	res.setHeader( 'Content-Type', 'text/html;charset=utf-8');
	res.write("<h1>中666文</h1>");//响应的内容（只能是字符串或者buffer）	
	res.end("<h1>中666文</h1>");//结束响应(也带输出功能)	
})
//设置监听端口
app.listen("8080","localhost",function(){
	console.log("服务已经运行，请打开http://localhost:8080查看")
})