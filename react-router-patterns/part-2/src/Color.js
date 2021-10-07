import React from "react";
import { useParams, Link } from "react-router-dom";


const Color=({colors})=>{
    const{color}= useParams();

    if(color){
        const currColor = colors.find(
            (c) => c.name.toLowerCase() === color.toLowerCase()
          );
        
        return(
            <div style={{backgroundColor:currColor.code}} >
       
                <div>{currColor.name}</div>
                <Link to="/colors"> Home</Link>
                
            </div>
        )
    }
    return null;
}

export default Color;