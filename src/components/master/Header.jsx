import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import UserContext from "../../context/user/userContext";

const Header = ({ openSide, nameDesc }) => {
  const [settings, setSettings] = useState(false);
  const usuarioNombre = localStorage.getItem("namedescription");
  const usuarioId = localStorage.getItem("iddescription");

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const months =
    month == 1
      ? "ene"
      : month == 2
      ? "feb"
      : month == 3
      ? "mar"
      : month == 4
      ? "abr"
      : month == 5
      ? "may"
      : month == 6
      ? "jun"
      : month == 7
      ? "jul"
      : month == 8
      ? "ago"
      : month == 9
      ? "sep"
      : month == 10
      ? "oct"
      : month == 11
      ? "nov"
      : month == 12
      ? "dic"
      : null;

  return (
    <div
      className="header"
      style={
        openSide
          ? {
              transition: ".3s ease",
              position: "absolute",
              paddingLeft: "230px",
              margin: "auto",
            }
          : {
              transition: ".3s ease",
              position: "absolute",
              paddingLeft: "80px",
              margin: "auto",
            }
      }
    >
      <img
        src="/logo-municipal.png"
        alt="logo municipal"
        className="logo-header"
      />
      <div className="calendar-container">
        <div className="ring ring-right"></div>
        <div className="ring ring-left"></div>
        <div className="paper-container">
          <div className="month">{months.toUpperCase()}</div>
          <div className="day">{day}</div>
        </div>
      </div>
      <div
        className="user-container"
        onClick={() => {
          setSettings(!settings);
        }}
      >
        <div className="img-user-container">
          <img
            src={`http://testiis01.campana.gov.ar/Hacienda/Fotos/Administradores/${usuarioId}/Perfil.jpg`}
            alt="perfil"
            className="user-img"
          />
        </div>
        <div style={{fontWeight:"500"}}>{usuarioNombre === "" ? "Usuario Default" : usuarioNombre} </div>
        <RiArrowDownSLine className="icon-arrow" />
        {settings ? (
          <div className="settings-container">
            <Link
              to="/"
              className="button-settings"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("namedescription");
                localStorage.removeItem("iddescription");
              }}
            >
              <FiLogOut className="icon-settings" />
              <div className="text-settings">Cerrar sesion </div>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
