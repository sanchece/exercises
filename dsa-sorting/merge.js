function merge(arr1,arr2) {
    let combinedArr=[];
    let i=0;
    let j=0;

    while(i <arr1.length && j<arr2.length){
        if(arr1[i]<arr2[j]){
            combinedArr.push(arr1[i]);
            i++;
        }
        else{
            combinedArr.push(arr2[j]);
            j++;
        }
    }
    while(i <arr1.length){
            combinedArr.push(arr1[i]);
            i++;
        }
    while(j <arr2.length){
        combinedArr.push(arr2[j]);
        j++;
        }
    return combinedArr;
}

function mergeSort(arr) {
    
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const lo = mergeSort(arr.slice(0, mid));
    const hi = mergeSort(arr.slice(mid));
  
    return merge(lo, hi);


}

module.exports = { merge, mergeSort};