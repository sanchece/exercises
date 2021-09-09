

function bubbleSort(arr) {

    function swap(arr,j){
        let temp=arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=temp;
    }
    for(let i=arr.length-1; i>=0;i--){
        for(let j=0;j<i;j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j)
            }
        }
    }
    return arr;
}

module.exports = bubbleSort;