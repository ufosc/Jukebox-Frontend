
import React from "react";
import "./Dashboard.css";
import NavBar from "../Components//NavBar/NavBar";
import TaskBar from "../Components/TaskBar/TaskBar";
import ControlPanel from "../Components/ControlPanel/ControlPanel";


function Dashboard() {
  
    return (  
      <div className=".container">
        <div className="rows">

        <div className=".container">
          
          <div className="boundary">
            <TaskBar></TaskBar>
          </div>
        </div>  


        </div>
        <div className="dashboard-container">
        
        <div className=".navbar">
          <NavBar></NavBar>
        </div>

        <div>
        <ControlPanel></ControlPanel>
        </div>
        
        </div>
      </div>
    )
  }
  
  export default Dashboard;