import React from "react";
import { Link } from "react-router-dom";


const VendingMachine=()=>{
    return (
        <div>
            <div>Vending Machine</div>
            <ul>
                <li><Link to="/chisps">Chips</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
                <li><Link to="/scantrons">Scantrons</Link> </li>
            </ul>


        </div>
    )
}

export default VendingMachine