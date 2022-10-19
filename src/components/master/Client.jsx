import React from "react";
import { HiArrowUp } from "react-icons/hi";

const Client = (users, title, userGet, sort, sortField, setSortField) => {

    const sorter = (field) => {
        setSortField([field, !sortField[1]]);
      };

  return (
    <div
      className="data-head-user"
      onClick={() => sorter(sort)}
      style={{ flex: 0.8 }}
    >
      <div>
        {title}
        <HiArrowUp
          style={
            sortField[1] && sortField[0] === `${sort}`
              ? { transition: ".4s", transform: "rotate(180deg)" }
              : { transition: ".4s", transform: "rotate(0deg)" }
          }
        />
      </div>
      {users.map((user) => (
        <div key={user.id} className="data-user-container">
          {user[userGet]}
        </div>
      ))}
    </div>
  );
};

export default Client;
