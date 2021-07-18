const { response } = require('express');
const express = require('express');
const app = express();
const CustomError = require('./customError');


  
app.get('/mean', function(request,response){
    if (!request.query.nums) {
        throw new CustomError('Nums are required.', 400)
      }
    strNums= request.query.nums.split(',');
    nums=strToNum(strNums);
    if (nums instanceof Error) {
        throw new CustomError(nums.message);
      }
 

    mean=nums.reduce(function(sum,curr){
        return sum + curr;
    })/nums.length;

    let result = {
        operation: "mean",
        value: mean
      }
    return response.send(result);

});

app.get('/mode',function(req,res){
    if (!req.query.nums) {
        throw new CustomError('Nums are required.', 400)
      }
    strNums= req.query.nums.split(',');
    nums=strToNum(strNums);
    if (nums instanceof Error) {
        throw new CustomError(nums.message);
      }
 
    mode= findMode(nums);

    let result = {
        operation: "mode",
        value: mode
      }
    return res.send(result)

})
app.get('/median',function(req,res){
    if (!req.query.nums) {
        throw new CustomError('Nums are required.', 400)
      }
    strNums= req.query.nums.split(',');
    
    nums=strToNum(strNums);
    if (nums instanceof Error) {
        throw new CustomError(nums.message);
      }
 
    median= findMedian(nums);
    let result = {
        operation: "median",
        value: median
      }
    return res.send(result);
})


function strToNum(strNums){
    let numArr=[];
    for(let i=0; i<strNums.length; i++){

        if (Number.isNaN(Number(strNums[i]))) {
            return new Error(
              ` '${strNums[i]}' is not a number.`
            );
          }
      


        numArr.push(Number(strNums[i]));
    }
    return numArr;
}

  
function findMedian(nums){
  
   nums.sort((a, b) => a - b); 
   let midIndex = Math.floor(nums.length / 2);
   let median;
   if (nums.length % 2 === 0) {
     median = (nums[midIndex] + nums[midIndex - 1]) / 2;
   } else {
     median = nums[midIndex];
   }
   return median
 }

function freqCounterFunction(arr) {
    return arr.reduce(function(sum, curr) {
        sum[curr] = (sum[curr] || 0) + 1;
      return sum;
    }, {});
  }

function findMode(arr) {
    let freqCounter = freqCounterFunction(arr);
    let counter = 0;
    let mode;
    for (let k in freqCounter) {
      if (freqCounter[k] > counter) {
        mode = k;
        counter = freqCounter[k];
      }
    }
    return mode;
  }


  

app.listen(3000,function(){
    console.log(' starting server on por 3000');
});
