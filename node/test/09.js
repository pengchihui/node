var express=require("express");
var path=require("path");
var bodyParser=require("body-parser");


var app=express();


app.use(bodyParser.urlencoded({
	extended:false
}))




app.get("/",function(req,res){
	app.engine("vue",require("express-art-template"))
	res.render("test.vue",{name:"666"})
})
app.get("/add",function(req,res){
	app.engine("html",require("express-art-template"))
	app.set("views",path.join(__dirname,"html"))
	res.render("submit.html",{name:"666"})
})


app.post("/add",function(req,res){
	console.log(req.body)
	res.send("666")
})





app.listen(8080,function(){
	console.log("正在运行")
})