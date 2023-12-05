import React from 'react';

// import ScrollQueue from "../ScrollQueue/ScrollQueue";
// import ScrollQueue 
import NowListening from "../NowListening/NowListening"
import DataChart from "../DataChart/DataChart";
import MemberList from "../MemberList/MemberList";
import MySvgImage from "./rectangle.svg";
import "./ControlPanel.css";
import ScrollQueue from '../ScrollQueue/ScrollQueue';

function ControlPanel(){

    return(

      <div className="container">
        <div className="container">
        <div class = 'two'>
        <div className = 'red'>
          <header className="row">
          <div className = 'red'>
            <h1 className="col-4">
              <div>


                Dashboard
              </div>
            </h1>
            </div>
          </header>
        </div>
        </div>

        <svg height="0" width="0">
	<defs>
		<clipPath id="svgPath">
    <rect x="0" y="0" stroke="#000000" stroke-miterlimit="10" width="108" height="500"/>
            <rect x="121.5" y="25.5" stroke="#000000" stroke-miterlimit="10" width="55" height="455"/>
            <rect x="192.5" y="9.5" stroke="#000000" stroke-miterlimit="10" width="60" height="484"/>
            <rect x="271.5" y="44.5" stroke="#000000" stroke-miterlimit="10" width="63" height="416"/>
            <rect x="349.5" y="25.5" stroke="#000000" stroke-miterlimit="10" width="208" height="447"/>
            <rect x="574.5" y="44.5" stroke="#000000" stroke-miterlimit="10" width="60" height="446"/>
            <rect x="644.5" y="9.5" stroke="#000000" stroke-miterlimit="10" width="68" height="471"/>
            <rect x="736.5" y="18.5" stroke="#000000" stroke-miterlimit="10" width="49" height="462"/>
		</clipPath>
	</defs>
</svg>
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



          <div className="row">
              outside
          </div>
        </div>


      </div>

    )

}

export default ControlPanel;