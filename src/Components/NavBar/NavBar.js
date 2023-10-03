import React from "react";
import {Link} from 'react-router-dom';
import "./NavBar.css";
import ScrollQueue from "../ScrollQueue/ScrollQueue";


function NavBar (){

    return(
        <div>
        <div className="navbar">
        <div >
        <Link to="/">
            <button className="btn">
                Landing
            </button>
        </Link>
        
        </div>
        <div>
            <Link to="/board1">
            <button className="btn">
                Board1
            </button>
        </Link>
        </div>

        </div>
        <div>
        <div>
            <ScrollQueue></ScrollQueue>
        </div>
        </div>
        </div>

    )


}

export default NavBar