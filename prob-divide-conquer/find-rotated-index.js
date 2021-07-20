function findRotatedIndex(arr,val) {
    let largestNum=findLargestNumIndex(arr);
    let valIndex=findValueIndex(arr,val,largestNum);
    return valIndex;
 
}
function findLargestNumIndex(arr){
    let lo=0;
    let hi=arr.length-1;

    while(lo<=hi){
        let mid= lo+Math.floor((hi-lo)/2);

        if(arr[mid]>arr[mid+1]){
            return mid;
        }
        else if(arr[mid]>arr[lo]){
            lo=mid+1;

        }
        else{
            hi=mid-1;
        }
    }
}

function findValueIndex(arr,val,largestNum){
    let lo=0;
    let hi=arr.length-1;
    if(val>=arr[0] &&val<=arr[largestNum]){
        lo=0;
        hi=largestNum;
    }
    else{
        lo=largestNum+1;
        hi=arr.length-1;
    }
    while(lo<=hi){
        let mid=lo+Math.floor((hi-lo)/2);

        if(arr[mid]===val){
            return mid;
        }
        else if(arr[mid]<val){
            lo=mid+1;
        }
        else{
            hi=mid-1;
        }
    }
}
// module.exports = findRotatedIndex