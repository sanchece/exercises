import React from "react";

const Box=({width, height, backgroundColor,handleRemove,id})=>{
    return(
        <div>
            <div style={{width:`${width}em`,height:`${height}em`,backgroundColor:`${backgroundColor}`}}></div>
            <button onClick={()=>handleRemove(id)}><b>X</b></button>
        </div>
    )

}

export default Box;