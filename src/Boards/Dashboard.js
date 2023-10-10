
import React from "react";
import "./Dashboard.css";
import NavBar from "../Components//NavBar/NavBar";
import ScrollQueue from "../Components/ScrollQueue/ScrollQueue";
import NowListening from "../Components/NowListening/NowListening";


function Console(){

    return(

      <div className="container">

        <div className="container">
          <header className="row">
          <h1 className="col-4">
            Dashboard
          </h1>
          <h1 className="col-6">
            Test
          </h1>
          </header>
        </div>

      <div className="body-container">

          <div className="row">

            <div className="col-1-of-4">
              <ScrollQueue></ScrollQueue>
            </div>


            <div className="col-1-of-4">
              <NowListening></NowListening>
            </div>

            <div className="col-1-of-2">
              Hello
            </div>

            
              <div className="col-1-of-6">
                Next To
              </div>
          </div>

          <div className="row">
              outside
          </div>
        </div>


        </div>

    )

}


function Dashboard() {
  
    return (  
      <div>
        <div className="row">


        </div>
        <div className="dashboard-container">
        
        <div>
        <NavBar></NavBar>
        </div>

        <div>
        <Console></Console>
        </div>
        
        </div>
      </div>
    )
  }
  
  export default Dashboard;