function guessingGame() {

    const randNum=Math.floor(Math.random() * 100);
    let correct=false;
    let guesses=0;

    return function guess(num){
        if(correct){
            return "you already won!"
        }
        if(num===randNum){
            correct=true
            return `You win! you found ${randNum} in ${guesses} guesses`
        }
        else if(num<randNum){
            guesses++
            return "You are too low"

        }
        else if(num>randNum){
            
            guesses++
            return "you are too high"
        }
    }

}

module.exports = { guessingGame };
