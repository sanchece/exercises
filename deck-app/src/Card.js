import React, { useState } from "react";

const Card=({name,img})=>{

    return(
        <img style={{height:"10em"}} alt={name} src={img} />
    )
}

export default Card;