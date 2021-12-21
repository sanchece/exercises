// add whatever parameters you deem necessary
function isSubsequence(str1,str2) {
    let front1=0;
    let end1=str1.length-1;
    let front2=0;
    let end2=str2.length-1;

    while(front2<end2){
        
        if(str1[front1]===str2[front2]){
            front1++;
            front2++;
            if(front1>end1){
                return true
            }
        }
        else{
            front2++;
        }
        if(str1[end1]===str2[end2]){
            end1--;
            end2--;
            if(front1<end1){
                return true
            }
        }
        else{
            end2--;
        }
        
    }
    return false

}

module.exports={isSubsequence}