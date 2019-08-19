// 加载http模块
var http = require("http");
var fs = require("fs");
var path=require("path");
var mime=require("mime");

// 创建服务请求(必有两个参数：请求和响应)
http.createServer(function(req, res) {
	// 路由配置(静态资源加载)

		//读取文件类型
		var filename=path.join(__dirname,req.url);
		var type=mime.getType(filename);
		console.log(type);
		
		fs.readFile(filename,function(err,data){
				// if (err) throw err;
			    if(err){
			    	res.setHeader("Content-Type","text/plain;charset=utf-8")
			    	res.end("文件不存在")
			    }else{
					res.setHeader("Content-Type",type+";charset=utf-8")
					res.end(data)
				}
		})


	

}).listen("8080", "localhost", function() {
	console.log("服务已经运行，请打开http://localhost:8080查看")
})
