import React from "react";

const Home = ({ openSide }) => {
  return (
    <h1
      className="title-bienvenidos"
      style={
        openSide
          ? {
              marginLeft: "200px",
              transition: ".3s ease",
              marginTop: "400px",
              marginBottom: "500px",
            }
          : {
              marginLeft: "20px",
              transition: ".3s ease",
              marginTop: "400px",
              marginBottom: "500px",
            }
      }
    >
      ¡Bienvenido!
    </h1>
  );
};

export default Home;
