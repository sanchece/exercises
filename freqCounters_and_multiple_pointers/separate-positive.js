// add whatever parameters you deem necessary
function separatePositive(arr) {
    let front=0;
    let end=arr.length-1;

    while(front<end){
        if(arr[front]<0 && arr[end]>0){
            let temp=arr[front];
            arr[front]=arr[end];
            arr[end]=temp;
            end--
            front++
        }
        else if(arr[front]>0){
            front++
        }
        else if(arr[end]<0){
            end--
        }
        else{
            end--
            front++
        }
    }
    return arr

}

module.exports={separatePositive}