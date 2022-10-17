import React from "react";
import { FiUser } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const Cards = (users) => {
  return (
    <div className="cards-containter">
      <div className="total-users-container">
        <div className="icon-user-container">
          <FiUser style={{ width: "25px", height: "25px" }} />
        </div>
        {users.users.length}
        <p className="text-card-user">Usuarios totales</p>
      </div>
      <div className="total-amount-container">
        <div className="icon-amount-container">
          <RiMoneyDollarCircleLine style={{ width: "25px", height: "25px" }} />
        </div>
        ${users.users.map((e) => e.total).reduce((prev, curr) => prev + curr, 0)}
        <p className="text-card-amount">Dinero total</p>
      </div>
    </div>
  );
};

export default Cards;
