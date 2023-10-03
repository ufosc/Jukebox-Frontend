import React from "react";
import Header from "Components/layout/Header/Header";
import Colors from "./Colors/Colors";
import Fonts from "./Fonts/Fonts";
import SystemColors from "./Colors/SystemColors";
import GreyScaleColors from "./Colors/GreyScaleColors";
import Buttons from "./Buttons/Buttons";

export default function DevGuide() {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-12">
          <h1>Dev Guide</h1>
          <Colors />
        </div>
        <div className="col-6">
          <Fonts />
        </div>
        <div className="col-6">
          <SystemColors />
          <GreyScaleColors />
          <Buttons />
        </div>
      </div>
    </div>
  );
}
