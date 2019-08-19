// let arr=[1,2,3,4,5];
// let str=arr.join("0").split('');
// console.log(arr.pop());
var arr = [1,2];
var arr2 = arr.concat();    
arr2.push( arr.splice(1,0) );
console.log(arr);
console.log(arr2);
console.log('1550'+3);
console.log((4>=4)&&(5<=2));
console.log(!(3<=1));
console.log(("a"=="a")&&("c"!="d"));
console.log((2<3)||(3<2));
var i = 0,j = 0;
    for(;i<10,j<6;i++,j++){
        k = i + j; 
    }
var x = 1;
function fn(n){n = n+1; }; 
console.log(fn(2));
 function fn1() {
       console.log(2)
    }
console.log( fn1() );
// console.log(k1);  //加载不到
var k1= function(a){ console.log(12) } ;
console.log(k1());
console.log("">"");
console.log("NaN" == "NaN" );
console.log("2"===2);
console.log(undefined==undefined);
console.log(NaN==NaN);
let str1="2245789fsefea";
console.log(str1.substring(0,1));
console.log(str1.substring(1,2));
console.log(Math.ceil(-3.14));
console.log(Math.floor(-3.14));
console.log(null===undefined);
var date=new Date();  
var hour=date.getHours();
console.log(hour);
var arr2=new Array(5); 
    arr2[1]=1; 
    arr2[5]=2; 
console.log(arr2.length); 
    var a = 10;  
    function test() {  
        a = 100;  
        console.log(a);  
        console.log(this.a);  
        var a;  
        console.log(a); 
    }
test(); 













 