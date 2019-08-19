let arr=[-1,-2,1,10,4,5,8];
// arr.sort(function(a,b){return a-b;});
// console.log(arr[arr.length-1]);


/* 冒泡排序 双循环 */
for(let i;i<arr.length;i++){
	  /* 首个for循环*/
	for(let j=0;j<arr.length;j++){
		if(arr[j]>arr[j+1]){
			/* 当前这个大于后一个 把大的保留 */
	       var temp = array[i];
           array[j] = array[j + 1];
           array[j + 1] = temp;
			
		}
	}
  
}

// let str="a-b-c-d";
// let arry=str.split("-");
// for(let i=0;i<arry.length;i++){
// 	if(i>0){
// 		arry[i]=arry[i].toUpperCase();
// 	}else{
// 		arry[i]=arry[i];
// 	}
// }
// str=arry.join("");
// console.log(str);

// let str1="";
// for(let i=0;i<arry.length;i++){
// 	if(i>0){
// 		str1=str1+arry[i].toUpperCase();
// 	}else{
// 		str1=arry[i];
// 	}
// }
// console.log(str1);


