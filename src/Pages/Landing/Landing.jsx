import React from "react";
import Header from "../../components/layout/Header/Header";
import Hero from "./components/Hero";
import Goal from "./components/Goal";
import Topics from "./components/Topics";
import Repos from "./components/Repos";
import Stat from "./components/Stat";
import { Link } from "react-router-dom";
import CTA from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer/Footer";

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
      <Link to="/Board1">
        <button>Board 1</button>
      </Link>
    </>
  );
}
