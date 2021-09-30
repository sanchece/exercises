import Card from "./Card";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Deck = () => {
  const [drawnCards, setDrawnCards] = useState([]);
  const [newCards, setNewCards] = useState([]);
  const [seconds,setSeconds]=useState(0);
  const timerId=useRef();


  useEffect(() => {
    const getCards = async () => {
      let cards = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      setNewCards(cards.data);
    };
    getCards();
    console.log(newCards);
  }, []);

  useEffect(() => {
    const getCard = async () => {
        let { deck_id } = newCards;
        let c = await axios.get(
          `http://deckofcardsapi.com/api/deck/${deck_id}/draw/`
        );
    
        if (c.data.remaining === 0) {
          alert("ran out of cards,reload to get new set of shuffled cards");
        }
        setDrawnCards([
          ...drawnCards,
          {
            name: c.data.cards[0].suit + " " + c.data.cards[0].value,
            image: c.data.cards[0].image,
            id: c.data.cards[0].code,
          },
        ]);
        console.log(c.data.cards[0].suit + " " + c.data.cards[0].value + "remaingin:"+c.data.remaining);
      };


        timerId.current=setInterval(async ()=>{
            setSeconds(seconds=>seconds+1)
            await getCard()
        },1000)

    return ()=>{clearInterval(timerId.current);}





  },[newCards]);


  const cardsHTML = drawnCards.map((card) => (
    <Card key={card.id} name={card.card} img={card.image} />
  ));
  return (
    <div>
      <button onClick="" >Draw card</button>
      <div>{cardsHTML}</div>
    </div>
  );
};

export default Deck;
