import React from 'react';
import {Link} from 'react-router-dom';
import "./TaskBar.css";


function TaskBar (){

    return(
        
        <>
        
        <div className="nav">
                <Link to="/">
                    <button className="btn-primary">
                        Landing
                    </button>
                </Link>
            
                <div className="borders">
                <Link to="/board1">
                <button className="btn-primary">
                    Board1
                </button>
                
                </Link>
            </div>
            
                <Link to="/">
                <button className="btn-primary">
                    Board2
                </button>
                </Link>
        </div>
        </> 

    )


}

export default TaskBar