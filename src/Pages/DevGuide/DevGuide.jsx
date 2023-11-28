import React from "react";

import Colors from "./Colors/Colors";
import Fonts from "./Fonts/Fonts";
import SystemColors from "./Colors/SystemColors";
import GreyScaleColors from "./Colors/GreyScaleColors";
import Buttons from "./Buttons/Buttons";
import Hero from "../Landing/components/Hero";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

export default function DevGuide() {
  return (
    <>
      <Header />
      <Hero title="Dev Guide" />
      <div className="container">
        <section>
          <h3>Brand Colors</h3>
          <Colors />
          <hr />
        </section>
        <div className="row margin-y">
          <div className="col-6">
            <h3 className="margin-bottom-sm">Primary Fonts</h3>
            <Fonts />
          </div>
          <div className="col-6">
            <h3 className="margin-bottom-sm">System Colors</h3>
            <SystemColors />
            <h3 className="margin-top margin-y-sm">Primary Fonts</h3>
            <GreyScaleColors />
            <h3 className="margin-top margin-y-sm">Buttons and Call to Actions</h3>
            <Buttons />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
