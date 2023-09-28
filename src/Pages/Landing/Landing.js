import React from "react";
import Header from "./layout/Header";
import Goal from "./components/Goal";
import Topics from "./components/Topics";
import Repos from "./components/Repos";
import Stat from "./components/Stat";
import CTA from "./layout/CTA";
import Footer from "./layout/Footer";

export default function Landing() {
  return (
    <>
      <Header />
      <Goal />
      <Topics />
      <Repos />
      <Stat />
      <CTA />
      <Footer />
    </>
  );
}
