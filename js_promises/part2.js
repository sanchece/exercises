baseURL= "https://deckofcardsapi.com/api/deck";



    //1
    // axios.get(`${baseURL}/new/draw`)
    // .then(card=>{
    //     let suit=card.data.cards[0].suit;
    //     let value=card.data.cards[0].value;
    //     console.log(`${value} of ${suit}`);
    // })


    //2
    // let firstCard=null;
    // axios.get(`${baseURL}/new/draw`)
    // .then(card=>{
    //     firstCard=card.data.cards[0];
    //     let deck=card.data.deck_id;
    //     return axios.get(`${baseURL}/${deck}/draw/`)
    // })
    // .then(card=>{
    //     let secondCard=card.data.cards[0];
    //     console.log(`card1: ${firstCard.value} of ${firstCard.suit}`);
    //     console.log(`card2: ${secondCard.value} of ${secondCard.suit}`);
    // })

    //3
    deck=null
    let $getCard= $('#get-card');
    let $shuffle= $('#shuffle');
    let $cards=$('#cards')
    $shuffle.on('click', function(){
        console.log("shuffled new deck of cards")
        axios.get(`${baseURL}/new/shuffle`)
        .then(card=>{
            deck=card.data.deck_id;
        })
    })

    $getCard.on('click', function(){
        axios.get(`${baseURL}/${deck}/draw/`)
        .then(card=>{
            let newCard=card.data.cards[0];
            console.log(`card${card.data.remaining}: ${newCard.value} of ${newCard.suit}`);
            $cards.append(
                `<div>card${card.data.remaining}: ${newCard.value} of ${newCard.suit}</div>`
              );
            if (card.data.remaining === 0) $getCard.remove();
        })
        .catch(err=>console.log("click on 'shuffle' first"))
    });
