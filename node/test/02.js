var http=require("http");
var fs=require("fs");

http.createServer(function(req,res){


fs.readFile("123.html","utf8",function(err,data){
	if (err) throw err;
	res.end(data);
})

fs.writeFile("123.html","node",function(err){
	if(err)throw err
	console.log("写入成功")
})


fs.readdir(".",function(err,data){
	if(err)throw err
	console.log(data)	
})




}).listen("8080","localhost",function(){
	console.log("服务已经运行，请打开http://localhost:8080查看")
})





