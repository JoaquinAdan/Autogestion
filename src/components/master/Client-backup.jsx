import React from "react";

const Client = ({ user }) => {
  return (
    <tbody>
      <tr>
        <td style={{ cursor: "auto" }}>
          <input style={{ cursor: "pointer", width: "auto", height: "auto" }} type="checkbox" className="checkbox" />
        </td>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.city}</td>
        <td>{user.date.slice(0, 10)}</td>
        <td>{user.payment ? "PAGO" : "DEUDA"}</td>
        <td>${user.total}</td>
      </tr>
    </tbody>
  );
};

export default Client;
