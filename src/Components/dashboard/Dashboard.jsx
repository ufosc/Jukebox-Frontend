import React from "react";
import "./Dashboard.css";
// import NavBar from "../Components/NavBar/NavBar";
import TaskBar from "../widgets/TaskBar/TaskBar";
import ControlPanel from "../widgets/ControlPanel/ControlPanel";
import NavBar from "../layout/NavBar/NavBar";

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
          <NavBar />
        </div>

        <div>
          <ControlPanel></ControlPanel>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
