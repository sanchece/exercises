function countZeroes(arr) {

    let firstZero = findFirstZero(arr);
    if (firstZero === -1) return 0;
    return arr.length - firstZero;
  }

function findFirstZero(arr){
    let loIndex=0;
    let hiIndex=arr.length-1;
    
    while(loIndex<=hiIndex){
        let midIndex=loIndex+(Math.floor((hiIndex-loIndex)/2));

        if(arr[midIndex]==1){
            loIndex=midIndex+1;
        }
        else if(arr[midIndex]==0 && arr[midIndex-1]==0){
            hiIndex=midIndex-1;
        }
        else{
            return midIndex;
        }
    }
    return -1;
}

module.exports = countZeroes