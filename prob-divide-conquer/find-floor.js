function findFloor(arr,x) {
    let lo=0;
    let hi=arr.length-1;
    while(lo<=hi){
        let mid=Math.floor((hi+lo)/2);

        if(arr[mid]<=x &&(arr[mid+1]>x ||mid==(arr.length-1))){
            return arr[mid];
        }
        else if(arr[mid]>x){
            hi=mid-1;
        }
        else{
            lo=mid+1;
        }
    }
    return -1;
}

// module.exports = findFloor