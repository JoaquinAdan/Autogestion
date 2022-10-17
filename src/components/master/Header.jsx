import React, { useContext, useState } from "react";
import UserContext from "../../context/user/userContext";

const Header = ({ openSide }) => {
  const {nameDescription} = useContext(UserContext);
const [settings, setSettings] = useState(false)
  return (
    <div
      className="header"
      style={
        openSide
          ? {
              transition: ".3s ease",
              position: "absolute",
              left: "100px",
              margin: "auto",
            }
          : {
              transition: ".3s ease",
              position: "absolute",
              left: "10px",
              margin: "auto",
            }
      }
    >
      <img
        src="/logo-municipal.png"
        alt="logo municipal"
        className="logo-header"
      />
      <div className="user-container" onClick={() => {setSettings(!settings)}}>
        <div className="img-user-container">
          <img
            src="/Admin-icon.png"
            alt="perfil"
            className="user-img"
          />
        </div>
        <div>{nameDescription} </div>
        🔽
        {settings ? <div>hola</div>: null}
      </div>
    </div>
  );
};

export default Header;
