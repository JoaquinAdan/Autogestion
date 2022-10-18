import React, { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import ClientMore from "./ClientMore"

const Client = ({ user, openSide }) => {
  const [more, setMore] = useState(false);
  return (
    <>
      <tr className="data-user-container">
        <td className="data-user" style={{ width: "97.25px" }}>
          {user.id}
        </td>
        <td className="data-user" style={{ width: "245px" }}>
          {user.nombre.toLowerCase()} {user.apellido === null ? " " : user.apellido.toLowerCase()}
        </td>
        <td className="data-user" style={{paddingLeft: "10px"}}>
          {user.cuit}
        </td>
        <td className="data-user">
          {user.fechaAlta.slice(0, 10)}
        </td>
        <td className="data-user">
          {user.fechaBaja === null ? "Vivo" : user.fechaBaja}
        </td>
        <td className="data-user" style={{paddingLeft: "90px"}}>
          {user.fechaBaja === null ? "No" : "si"}
        </td>
        <td className="data-user pencil" onClick={() => setMore(!more)}>
          <HiPencilAlt />
        </td>
        {/* <td className="data-user">{user.cuit}</td>
        <td className="data-user">{user.datealta.slice(0, 10)}</td>
        <td className="data-user">{user.datebaja.slice(0, 10)}</td>
        <td className="data-user">{user.baja ? "Si" : "No"}</td>
        <td className="data-user pencil" onClick={() => setMore(!more)}>
          <HiPencilAlt />
        </td> */}
      </tr>
      {more ? <ClientMore setMore={setMore} openSide={openSide}/> : null}
    </>
  );
};

export default Client;
