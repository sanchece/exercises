function sortedFrequency(arr,val) {
    let firstInstanceOfVal=findFirst(arr,val);
    if(firstInstanceOfVal==-1) return -1;
    let lastinstanceOfVal=findLast(arr,val);
    return (lastinstanceOfVal+1)-firstInstanceOfVal;

}

function findFirst(arr,val){
    let lo=0;
    let hi=arr.length-1;

    while(lo<=hi){
        let mid=lo+(Math.floor((hi-lo)/2));
        if(arr[mid]<val){
            lo=mid+1;
        }
        else if(arr[mid]==val && arr[mid-1]==val){
            hi=mid-1;
        }
        else{
            return mid;
        }
    }
    return -1;
}

function findLast(arr,val){
    let lo=0;
    let hi=arr.length-1;

    while(lo<=hi){
        let mid=lo+Math.floor((hi-lo)/2);

        if(arr[mid]<val || arr[mid]==val && arr[mid+1]==val ||arr[mid]==val && arr[mid-1]<val){
            lo=mid+1;
        }
        else if(arr[mid]>val){
            hi=mid-1;
        }
        else{
            return mid;
        }
    }
    return -1
}




module.exports = sortedFrequency