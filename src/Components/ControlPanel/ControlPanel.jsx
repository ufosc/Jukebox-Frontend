import React from 'react';

// import ScrollQueue from "../ScrollQueue/ScrollQueue";
// import ScrollQueue 
import NowListening from "../NowListening/NowListening"
import DataChart from "../DataChart/DataChart";
import MemberList from "../MemberList/MemberList";
import re from "./rectangle.svg";
import "./ControlPanel.css";
import ScrollQueue from '../core/ScrollQueue/ScrollQueue';

function ControlPanel(){

    return(

      <div className="container">
        {/*I  hate the padding */}
        <div className="containers">

        <div className = 'two'>
          <div className = 'grey'>
            <header className="row">
            <div className = 'red'>
              <h1 className="col-4">
                <div className="title">


                  Dashboard
                </div>
              </h1>
              <svg xmlns="http://www.w3.org/2000/svg" width="1035" height="100" viewBox="0 0 1035 171" fill="none">
        	      <defs>
        		    <clipPath id="svgPath">
                
                <path d="M0 0H1035L860.763 130.901C826.121 156.928 783.962 171 740.632 171H0V0Z" />
            
        		    </clipPath>
        	      </defs>
              </svg>
              </div>
            </header>
          </div>
        </div>


        

        </div>

        <div className="body-container">

          <div className="row">

            <div className="col-6">
              <NowListening></NowListening>
            </div>

            <div className="col-6">
              <DataChart></DataChart>
            </div>
          </div>
          
          <div className="row">
            <div className="col-1-of-4">
              <ScrollQueue />
              
            </div>

              <div className="col-6">
              <MemberList></MemberList>
              </div>
          </div>
          
        </div>


      </div>

    )

}

export default ControlPanel;