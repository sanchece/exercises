// add whatever parameters you deem necessary
function freqCounter(int){
    return String(int).split("").reduce((obj,digit)=>{
        obj[digit]=obj[digit]+1||1;
        return obj
    }, {})
}

function sameFrequency(int1,int2) {
    
    if(int1.length!=int2.length){
        return false
    }
    const int1Freq=freqCounter(int1);
    const int2Freq=freqCounter(int2);

    if(int1Freq.length!=int2Freq.length){
        return false
    }
    for(let key in int1Freq){
        if(int1Freq[key]!==int2Freq[key]){
            return false
        }
    }
    return true

}

module.exports={sameFrequency}