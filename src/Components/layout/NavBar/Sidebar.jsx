import React from "react";

import SideBarLink from "./SideBarLink";

import "./Sidebar.css";


export default  function Sidebar(){


    return(
        <>
        <div className="section">
        <div className="section-1">
            <div className="Sidebarheader">
                Side Bar Links
            </div>

            <div className="body">
                <SideBarLink link={"/"} linkName={"Home"}/>
                <SideBarLink link={"/board1"} linkName={"Board 1"}/>
                <SideBarLink link={"/board2"} linkName={"Board 2"}/>
            </div>

            <div className="SidebarLine" />
            
            <div className="accountButton">
                Settings
            </div>
            <div className="accountButton">
                Account
            </div>
        </div>
        </div>
        </>
    )

}