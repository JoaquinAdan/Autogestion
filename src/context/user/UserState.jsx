import React, { useState } from "react";
import UserContext from "./userContext";

const dominio = "http://192.168.10.82:4026/api";
const URL = `${dominio}/Auth/create`;

const UserState = (props) => {
  const initialState = "";
  const [nameDescription, setNameDescription] = useState("");
  const [idDescription, setIdDescription] = useState("");
  const [inputNameText, setInputNameText] = useState(initialState);
  const [inputLastNameText, setInputLastNameText] = useState(initialState);

  const callUser = async (user, pass) => {
    const credenciales = {
      username: user,
      password: pass,
    };
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(credenciales),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    setNameDescription(data.description);
    setIdDescription(data.description);
    localStorage.setItem("namedescription", data.description)
    localStorage.setItem("iddescription", data.id)
    if (!response.ok) {
      return null;
    } else {
      return await data;
    }
  };

  return (
    <UserContext.Provider
      value={{
        initialState,
        inputNameText,
        setInputNameText,
        inputLastNameText,
        setInputLastNameText,
        nameDescription,
        callUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
