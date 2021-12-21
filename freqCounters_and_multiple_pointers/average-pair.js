// add whatever parameters you deem necessary
function averagePair(arr,avgGoal) {

    let left=0;
    let right=arr.length-1

    while(left<right){
        let avg=(arr[left]+arr[right])/2
        if(avg==avgGoal){
            return true
        }
        else if(avg<avgGoal){
            left++
        }
        else if(avg>avgGoal){
            right--
        }
    }
    return false

}

module.exports={
    averagePair
}