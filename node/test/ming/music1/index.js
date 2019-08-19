var express=require("express");
var path=require("path");
var fs=require("fs");
var bodyParser=require("body-parser");
var UUID= require('uuid');
var multer=require("multer");

var app=express();

app.use(bodyParser.urlencoded({
	extended:false
}))

/* 任意结尾文件名 */
app.engine("css",require("express-art-template"));
app.engine("html",require("express-art-template"));
app.set("views",path.join(__dirname,"/"));
/* 任意界面跳转 及 静态资源 */
app.use("/css",express.static(path.join(__dirname,"css")));
app.use("/upload",express.static(path.join(__dirname,"upload")));

/* 自定义上传文件目录 与格式 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'upload'));//不存在则报错
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+'-'+file.originalname);
  }
})
var upload = multer({ storage: storage });

var upload = multer({ storage: storage })


/* 显示 */
app.get("/",function(req,res){
	 fs.readFile(path.join(__dirname,"music.txt"),"utf8",function(err,data){
		  if (err) throw err;
		  var list=JSON.parse(data);
		  res.render("index.html", list);
	 })
})

/* 增加 */
app.get("/add.html",function(req,res){
	  res.render("add.html");
})
var vv=upload.fields([{name:'picture',maxCount:1},{name:'music',maxCount:1}]);
app.post("/add",vv,function(req,res){
     fs.readFile(path.join(__dirname,"music.txt"),"utf8",function(err,data){
    		  if (err) throw err;
    		  var list=JSON.parse(data);
			  var obj=req.body;
			  obj.id=UUID.v4();
			  obj.picture=("/upload/"+req.files['picture'][0].filename);
			  obj.music=("/upload/"+req.files['music'][0].filename);
			  list.music.push(obj);/* 对象里面的对象数组 */
			  // res.send(list);
			  fs.writeFile(path.join(__dirname,"music.txt"),JSON.stringify(list),function(err){
				  res.redirect("/");
			  })
    })
})
/* 删除 */
app.use("/delete",function(req,res){
	var id=req.query.id;
	fs.readFile(path.join(__dirname,"music.txt"),"utf8",function(err,data){
		var list=JSON.parse(data);
        var arr=list.music;	
	    for(var i=0;i<arr.length;i++){
			if(arr[i].id==id){
				  fs.unlinkSync(path.join(__dirname,arr[i].picture));
				  fs.unlinkSync(path.join(__dirname,arr[i].music));
				  arr.splice(i,1);
				  fs.writeFile(path.join(__dirname,"music.txt"),JSON.stringify(list),function(err){
					  res.redirect("/");
				  })
			}
		}
	})
})

function isFile(path){  
    // return exists(path) && fs.statSync(path).isFile();  
	return fs.statSync(path).isFile();  
}  

/* 修改 */
var pic,mic;
app.use("/update",function(req,res){
	 id=req.query.id;
	 fs.readFile(path.join(__dirname,"music.txt"),"utf8",function(err,data){
		 var list=JSON.parse(data);
		 var arr=list.music;	
		 for(var i=0;i<arr.length;i++){
		 	if(arr[i].id==id){
				  pic=arr[i].picture;
				  mic=arr[i].music;
		 		  var obj=arr[i];
				  res.render("update.html",obj);
		 		  // res.send(obj);
		 	}
		 }
	 }) 
})

app.use("/que",vv,function(req,res){
      var id=req.body.id;
	  fs.readFile(path.join(__dirname,"music.txt"),"utf8",function(err,data){
	  	  var list=JSON.parse(data);
	      var arr=list.music;
		  spic=req.files['picture']==null?pic:("/upload/"+req.files['picture'][0].filename);
		  smic=req.files['music']==null?mic:("/upload/"+req.files['music'][0].filename);   
		     if(spic!=pic){
		  	   fs.unlink(path.join(__dirname,pic),err=>{console.log("更改了pic")});
		     }else if(smic!=mic){
		  	   fs.unlink(path.join(__dirname,mic),err=>{console.log("更改了mic")});
		     }else{
		  	   console.log("没有更改");
		     }
			 
	      for(var i=0;i<arr.length;i++){
	  		if(arr[i].id==id){
				
	  			arr[i].title=req.body.title;
				arr[i].singer=req.body.singer;
				arr[i].picture=spic;
				arr[i].music=smic;
				// res.send(pic+"<br/>"+spic+"<br/>"+mic+"<br/>"+smic);
	  			  fs.writeFile(path.join(__dirname,"music.txt"),JSON.stringify(list),function(err){
	  				  res.redirect("/");
	  			  })
	  		}
	  	}
	  })
})

app.listen("8080","localhost");


















