let mime=require("mime");
let http=require("http");
let path=require("path");
let fs=require("fs");
// http.createServer(function(req, res) {
// 	/* 读取路径信息 */
// 	let filename=path.join(__dirname,req.url);
// 	let page=mime.getType(filename);
	/* 移动文件 */
	fs.rename("../css/cd/phone-index","../css/cd/phone-list.css",(err)=>{
	   if(err){
		  console.log(err); 
	   }else{
	      // fs.unlink("../css/phone-index.css");
	      console.log("123");
	   }
	})
// 	res.end(page);
// 	
// }).listen("8080");
















