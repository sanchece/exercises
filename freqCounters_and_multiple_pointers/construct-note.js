// add whatever parameters you deem necessary
//dd
function freqCounter(str){
    return str.split("").reduce((obj,char)=>{
        obj[char]= obj[char] +1 || 1;
        return obj
    },{})

}


function constructNote(msg,letters){

    const msgFreq=freqCounter(msg);
    const lettersFreq=freqCounter(letters)
    for(let char in msgFreq){
        if(!lettersFreq[char]){
            return false
        }
        if(lettersFreq[char]<msgFreq[char]){
            return false
        }
    }
    return true
}

module.exports={constructNote}
// .load construct-note.js