let baseURL = 'https://deckofcardsapi.com/api/deck';

//1
async function part1(){
    let card = await axios.get(`${baseURL}/new/draw`)
    let suit=card.data.cards[0].suit;
    let value=card.data.cards[0].value;
    console.log(`${value} of ${suit}`);
}

// 2.
async function part2() {
  let firstCard = await axios.get(`${baseURL}/new/draw/`);
  let deck = firstCard.data.deck_id;
  let secondCard = await axios.get(`${baseURL}/${deck}/draw/`);
  console.log(`card1: ${firstCard.data.cards[0].value} of ${firstCard.data.cards[0].suit}`);
  console.log(`card2: ${secondCard.data.cards[0].value} of ${secondCard.data.cards[0].suit}`);
}


//3
let deck=null
let $getCard= $('#get-card');
let $shuffle= $('#shuffle');
let $cards=$('#cards')

$shuffle.on('click',async function(){
    console.log("shuffled new deck of cards")
    let card= await axios.get(`${baseURL}/new/shuffle`);
    deck=card.data.deck_id
    console.log(deck)
})

$getCard.on('click', async function(){
    try{
        let newCard=await axios.get(`${baseURL}/${deck}/draw/`);
        // console.log(newCard.data.remaining);
         $cards.append(
             `<div>card${newCard.data.remaining}: ${newCard.data.cards[0].value} of ${newCard.data.cards[0].suit}</div>`
           );
         if (newCard.data.remaining === 0) $getCard.remove();
    }
    catch{
        console.log("click on 'shuffle' first")
    }
})

