var path=require("path");
console.log(__dirname);
console.log(__filename);
console.log(path.join("a","b/c","d","../.."));
var page="html/index.html";
console.log(path.join(__dirname,page));

