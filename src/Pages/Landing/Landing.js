import React from "react";
import Header from "../../Components/layout/Header/Header";
import Hero from "./components/Hero";
import Goal from "./components/Goal";
import Topics from "./components/Topics";
import Repos from "./components/Repos";
import Stat from "./components/Stat";
import CTA from "../../Components/layout/CTA";
import Footer from "../../Components/layout/Footer";

export default function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <Goal />
      <Topics />
      <Repos />
      <Stat />
      <CTA />
      <Footer />
    </>
  );
}
