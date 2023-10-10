import React from "react";
import Header from "../../Components/layout/Header/Header";
import Hero from "./components/Hero";
import Goal from "./components/Goal";
import Topics from "./components/Topics";
import Repos from "./components/Repos";
import Stat from "./components/Stat";
//import CTA from "./layout/CTA";
//import Footer from "./layout/Footer";
//import Board1 from "../Board1/Board1";
import {Link} from 'react-router-dom';


export default function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <Goal />
      <Topics />
      <Repos />
      <Stat />
      
      <Link to="/board1">
        <button>
          Board 1
        </button>
      </Link>
      <div>
      <Link to="/dashboard">
        <button>
          Dashboard
        </button>
      </Link>
      </div>
    </>
  );
}
