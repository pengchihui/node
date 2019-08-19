var express=require("express");
var path=require("path")
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })//存储位置，不存在则自动创建


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'/html/files'))//不存在则报错
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
  }
})
var upload = multer({ storage: storage })


var app=express();

app.get("/",function(req,res){
	app.engine("html",require("express-art-template"))
	app.set("views",path.join(__dirname,"html"))
	res.render("file_submit.html")
	console.log(123)
})


app.post("/add",upload.array('pic',2),function(req,res){
	console.log(req.files[0].filename);
	console.log(req.files[1].filename);
	console.log(req.body);
	res.send("666")
})





app.listen(8080,function(){
	console.log("正在运行")
})