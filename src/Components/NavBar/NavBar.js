import React from "react";
import {Link} from 'react-router-dom';
import "./NavBar.css";


function NavBar (){

    return(
        
        <div className="navbar-1">
            <div className="row">
                <Link to="/">
                    <button className="btn">
                        Landing
                    </button>
                </Link>
            </div>

            <div className="row">
                <div className="borders">
                <Link to="/board1">
                <button className="btn">
                    Board1
                </button>
                
                </Link>
            </div>
            </div>

            <div className="row">
                <Link to="/">
                <button className="btn">
                    Board2
                </button>
                </Link>
            </div>

        </div>
        

    )


}

export default NavBar