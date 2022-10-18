import React, { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import ClientMore from "./ClientMore";

const Client = ({ user, openSide }) => {
  const [more, setMore] = useState(false);
  return (
    <>
      <div className="tbody-container-data">
        <div className="data-user-container" style={{ width: "89px" }}>
          {user.id}
        </div>
        <div
          className="data-user-container"
          style={{
            paddingLeft: "0px",
            flex: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user.nombre.toLowerCase() + " "}
          {user.apellido === null ? " " : user.apellido.toLowerCase()}
        </div>
        <div className="data-user-container" style={{ paddingLeft: "10px" }}>
          {user.cuit}
        </div>
        <div
          className="data-user-container"
          style={{
            flex: 2,
          }}
        >
          {user.fechaAlta.slice(0, 10)}
        </div>
        <div
          className="data-user-container"
          style={{
            flex: 2,
          }}
        >
          {user.fechaBaja === null ? "Vivo" : user.fechaBaja}
        </div>
        <div className="data-user-container" style={{ paddingLeft: "90px" }}>
          {user.fechaBaja === null ? "No" : "si"}
        </div>
        <div
          className="data-user-container pencil"
          onClick={() => setMore(!more)}
        >
          <HiPencilAlt />
        </div>
      </div>
      {more ? <ClientMore setMore={setMore} openSide={openSide} /> : null}
    </>
  );
};

export default Client;
