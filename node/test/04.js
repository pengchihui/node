// 加载http模块
var http = require("http");
var fs = require("fs");
var path=require("path");

// 创建服务请求(必有两个参数：请求和响应)
http.createServer(function(req, res) {
	// 路由配置(静态资源加载)
	console.log(req);
	if (req.url == "/") {
		fs.readFile(path.join(__dirname,"html/index.html"), "utf8", function(err, data) {
			if (err) throw err;
			res.end(data);
		})
	}else if(req.url == "/file"){
		fs.readFile(path.join(__dirname,"html/file.html"), "utf8", function(err, data) {
			if (err) throw err;
			res.end(data);
		})
	}else if(req.url=="/img/u0_06.jpg"){		
			fs.readFile(path.join(__dirname,"img/u0_06.jpg"),function(err, data) {
				if (err) throw err;
				res.end(data);
			})
	}

}).listen("8080", "localhost", function() {
	console.log("服务已经运行，请打开http://localhost:8080查看")
})
