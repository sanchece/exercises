import React from "react";
import {Link} from "react-router-dom"
const ColorList=({colors})=>{
    return(
        
        <div>
            <ul>
                
            {colors.map(color=>(
                <li> <Link exact to={`/colors/${color.name}`}>{color.name}</Link></li>
            ))}

            </ul>
        </div>
    )
}
export default ColorList;
