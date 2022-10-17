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
        <td className="data-user" style={{ width: "231px" }}>
          {user.name}
        </td>
        <td className="data-user">{user.cuit}</td>
        <td className="data-user">{user.datealta.slice(0, 10)}</td>
        <td className="data-user">{user.datebaja.slice(0, 10)}</td>
        <td className="data-user">{user.baja ? "Si" : "No"}</td>
        <td className="data-user pencil" onClick={() => setMore(!more)}>
          <HiPencilAlt />
        </td>
      </tr>
      {more ? <ClientMore setMore={setMore} openSide={openSide}/> : null}
    </>
  );
};

export default Client;
