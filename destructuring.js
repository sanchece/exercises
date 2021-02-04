//Destructuring Exercise

//1.)
//8
//1846

//2.)
//{yearNeptuneDiscovered:1846, yearMarsDiscovered:1659}

//3.)
//Your name is Alejandro and you like purple
//your name is Melissa and you like greem
//your name is undefined and you like green

//4.)
// Maya
//Marisa
//Chi

//5.)
//Raindrops on roses
//whiskers on kittens
//[Bright cooper kettles, warm woolen mittens, brown paper packages tied up with strings]

//6.)
// [10,30,20]

//ES2015Refactoring
const obj={
    numbers:{
        a:1,
        b:2
    }
}
let {a,b}=obj.numbers;

//ES5 Array Swap
var arr = [1, 2];
[arr[0],arr[1]]=[arr[1],arr[0]];

//raceResults()

const raceResults=([first,second,third,...rest])=>({first,second,third,rest});