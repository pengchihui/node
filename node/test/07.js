var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");
var template = require("art-template");
//var asd=require("alert-node");



http.createServer(function(req, res) {
	res.setHeader('Content-Type', 'text/html;charset=utf-8');
	if (req.url == "/") {
		//asd("13263")
		//读取数据文件
		fs.readFile(path.join(__dirname, "html", "data.json"), "utf8", function(err, data) {
			if (err) throw err;
			var list = JSON.parse(data);
			fs.readFile(path.join(__dirname, "html", "list.html"), "utf8", function(err, data) {
				if (err) throw err;
				var str = template.render(data, list);
				res.end(str);
			})

		})



	} else if (req.url == "/submit.html") {
		fs.readFile(path.join(__dirname, "html", "submit.html"), "utf8", function(err, data) {
			if (err) throw err;
			res.end(data);
		})
	} else if (req.url == "/add" && req.method == "POST") {
		fs.readFile(path.join(__dirname, "html", "data.json"), "utf8", function(err, data) {
			if (err) throw err;
			var list = JSON.parse(data);

			var arr = [];
			var obj = null;
			req.on("data", function(data) {
				arr.push(data)
			})

			req.on("end", function(data) {
				var str = arr.join().toString("utf8");
				obj = url.parse("http://xxx?" + str, true).query
				console.log(obj)

				list.data.unshift(obj)
				fs.writeFile(path.join(__dirname, "html", "data.json"), JSON.stringify(list), function(err) {
					if (err) throw err
					console.log("提交成功");
					res.writeHead(302, 'Found', {
						"Location": "/"
					})
					res.end()
				})
			})
		})


	} else if (req.url.startsWith("/add") && req.method == "GET") {

		fs.readFile(path.join(__dirname, "html", "data.json"), "utf8", function(err, data) {
			if (err) throw err;
			var list = JSON.parse(data);
			var obj = url.parse(req.url, true).query
			
			list.data.unshift(obj)
			fs.writeFile(path.join(__dirname, "html", "data.json"), JSON.stringify(list), function(err) {
				if (err) throw err
				console.log("提交成功");
				res.writeHead(302, 'Found', {
					"Location": "/"
				})
				res.end()
			})
		})
		// if(confirm("提交成功，是否返回首页")){
		// 	res.writeHead({"Location":"/"})	
		// 	res.end()
		// }else{
		// 	res.writeHead({"Location":"/submit.html"})	
		// 	res.end()
		// }	


	} else {
		res.end("404")
	}


}).listen("8080", "localhost", function() {
	console.log("服务已经运行，请打开http://localhost:8080查看")
})
