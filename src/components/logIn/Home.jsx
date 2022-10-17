import React from "react";
import { useState } from "react";
import LogIn from "./LogIn";
import Footer from "./Footer";

const Home = () => {
  const [side, setSide] = useState(false);
  return (
    <div className="home-container">
      <div
        className="home"
        style={
          side
            ? { flex: 1.5, transition: ".5s ease" }
            : { flex: 2, transition: ".5s ease" }
        }
        onClick={() => setSide(false)}
      >
        <a href="https://www.campana.gob.ar/" style={{ cursor: "pointer" }}>
          <img
            className="logo"
            src="logo-municipal.png"
            alt="logo municipalidad de campana"
          />
        </a>
      </div>
      <LogIn setSide={setSide} />
      
      <Footer />
    </div>
  );
};

export default Home;
