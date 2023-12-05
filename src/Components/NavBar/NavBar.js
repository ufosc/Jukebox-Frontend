import React from "react";
import {Link} from 'react-router-dom';
import "./NavBar.css";


function NavBar (){

    return(
        <div className="navbar">
        <div className="navbar-1">
            <div className="borders">
            <div className="row">
                <Link to="/">
                    <button className="btn-secondary">
                        Landing
                    </button>
                </Link>
            </div>

            <div className="row">
                <div className="borders">
                <Link to="/board1">
                <button className="btn-secondary">
                    Board1
                </button>
                
                </Link>
            </div>
            </div>

            <div className="row">
            <div className="borders">
                <Link to="/">
                <button className="btn-inline">
                    Board2
                </button>
                </Link>
                </div>
            </div>
            </div>
        </div>
        </div>

    )


}

export default NavBar