function findRotationCount(arr) {
  let lo=0;
  let hi=arr.length-1;
  while(lo<=hi){
      let mid=lo+Math.floor((hi-lo)/2);

      if(arr[mid]<arr[mid-1]){
          return mid
      }
      else if(arr[mid]<arr[lo]){
          hi=mid-1;
      }
      else{
          lo=mid+1;
      }
  }
  return 0;
}

module.exports = findRotationCount