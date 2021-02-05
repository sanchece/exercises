// Maps and sets exercise


//1.)
// new Set([1,1,2,2,3,4])

//2.)
// "ref"

//3.)
//  {array(3)=>true, Array(3)=>false}

//4.)
const hasDuplicate=arr=> new Set(arr).size!=arr.length;

//5.)
const vowelCount=str=>{
    const vowels=new Set("aeiou");
    const newStr=str.toLowerCase();
    const map=new Map();
    for(let letter of newStr){
        if(vowels.has(letter)){
            if(map.has(letter)){
                map.set(letter,map.get(letter)+1)
            }
            else{
                map.set(letter,1);
            }
        }
    }
    return map;
}