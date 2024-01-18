
import React from "react";
import "./Dashboard.css";
import NavBar from "../Components//NavBar/NavBar";
import TaskBar from "../Components/TaskBar/TaskBar";
import ControlPanel from "../Components/ControlPanel/ControlPanel";

import Sidebar from "../Components/NavBar/Sidebar";


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
          <Sidebar/>
        </div>

        <div>
          <ControlPanel></ControlPanel>
        </div>
        
        </div>
      </div>
    )
  }
  
  export default Dashboard;