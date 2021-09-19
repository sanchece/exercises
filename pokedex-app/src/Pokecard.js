import React from 'react';
import './Pokecard.css';



const Pokecard=(props)=>{
    // let poke_img_broken=`https://raw.githubusercontent.com/' +
    // 'PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`
    let poke_img=`https://www.nme.com/wp-content/uploads/2016/12/POTY_Pikachu_3.jpg`
  return(
      <div className="pokecard">
          <div className="pokecard-name">{props.name}</div>
          <img className="poke-img" src={poke_img} ></img>
          <div className="pokecard-type">Type:{props.type}</div>
          <div className="pokecard-exp">EXP:{props.exp}</div>
      </div>
  )
}

export default Pokecard;
