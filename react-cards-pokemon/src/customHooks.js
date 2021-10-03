import { useState, useEffect } from "react";
import axios from "axios";
import uuid from "uuid";

const useFlip=(flipped=true)=>{
    const [isFacingUp, setIsFacingUp] = useState(flipped);
    const flipCard = () => {
      setIsFacingUp(isUp => !isUp);
    };
    return [isFacingUp,flipCard];

}


const useAxios=(requestURL,additionalURL="")=>{
    const [res, setRes] = useState([]);
    const getRes = async () => {
        const response = await axios.get(`${requestURL}${additionalURL}`);
        setRes(cards => [...cards, { ...response.data, id: uuid() }]);
      };

    return [res,setRes]

}

export { useFlip};