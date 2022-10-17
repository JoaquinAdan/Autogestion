import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const initialState = "";
  const [nameDescription, setNameDescription] = useState("");
  const [inputNameText, setInputNameText] = useState(initialState);
  const [inputLastNameText, setInputLastNameText] = useState(initialState);

  const URL = "http://192.168.10.82:4026/api/Auth/create";
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
    setNameDescription(data.description)
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
