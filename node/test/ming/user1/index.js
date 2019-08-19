var express=require("express");
var path=require("path");
var mongoose=require("mongoose");
var fs=require("fs");
var bodyParser=require("body-parser");
var multer= require('multer');


/* 连接数据库 */
mongoose.connect("mongodb://localhost/user");
/* 数据库结构 */

var Schema=mongoose.Schema;
var People=new Schema({
	name:{type:String,require:true},
	age:Number,
	picture:String,
	music:String,
	friend:String
	// friend:[{String},{String}]
});
var user=mongoose.model("users",People);

var app=express();

/* 设置可识别的文件类型 */
app.engine("html",require("express-art-template"));
app.set("views",path.join(__dirname,"/"));

/* 静态文件的处理 */
app.use("/image",express.static(path.join(__dirname,"img")));
app.use("/mp3",express.static(path.join(__dirname,"img")));
app.use("/upload",express.static(path.join(__dirname,"upload")));

/* post数据类型的处理 */
app.use(bodyParser.urlencoded({
	extended:false
}))

/* 自定义上传目录 及其 格式 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'upload'));//不存在则报错
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+'-'+file.originalname);
  }
})
var upload = multer({ storage: storage });

/* 显示 */
app.get("/",function(req,res){
	fs.readFile(path.join(__dirname,"index.html"),"utf8",function(err,data){
		 if (err) throw err;
		 user.find({},function(err,all){
			 res.render("index.html",{"music":all});
		 });
	})
	
})

/* 添加 */
app.get("/add.html",function(req,res){
	 res.render("add.html");
})

var cpUpload = upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'mic', maxCount: 1 }])
app.post("/add",cpUpload ,function(req,res){
	var obj=req.body;
	var pic="/upload/"+req.files['pic'][0].filename;
	var mic="/upload/"+req.files['mic'][0].filename;
	obj.picture=pic;
	obj.music=mic;
	var one=new user(obj);
	one.save();
    res.redirect("/");
})

/* 删除 */
app.use("/delete",function(req,res){
	var id=req.query.id;
	user.find({},function(err,all){
		if (err) throw err;
		var all=all;
		for(var i=0;i<all.length;i++){  
			if(all[i]._id==id){
				  fs.unlinkSync(path.join(__dirname,all[i].picture));
				  fs.unlinkSync(path.join(__dirname,all[i].music));
				  user.deleteOne({_id:id}).then(function(){
					   res.redirect("/");
		  		  })
		    }
		}
	});
})


/* 更改 */
var pic,mic;
app.use("/update.html",function(req,res){
	var id=req.query.id;
	user.find({_id:id}).then(function(data){
		 var str=JSON.stringify(data[0]);
		 var kjj=JSON.parse(str);
		 pic=kjj.picture;
		 mic=kjj.music;
		 res.render("update.html",kjj);
	});
	
})
var vv = upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'mic', maxCount: 1 }]);
app.post("/update",vv,function(req,res){
	spic=req.files['pic']==null?pic:("/upload/"+req.files['pic'][0].filename);
	smic=req.files['mic']==null?mic:("/upload/"+req.files['mic'][0].filename);   
		   if(spic!=pic){
			   fs.unlink(path.join(__dirname,pic),err=>{console.log("更改了pic")});
		   }else if(smic!=mic){
			   fs.unlink(path.join(__dirname,mic),err=>{console.log("更改了mic")});
		   }else{
			   console.log("没有更改");
		   }
	var id=req.body.id;
	var obj=req.body;
	user.updateOne({_id:id},{
		name:obj.name,
		age:obj.age,
		picture:spic,
		music:smic,
		friend:obj.friend,
		},function(){
        res.redirect("/");
	});
})

app.listen(8080);

