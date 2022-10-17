import React from "react";
import Form from "./Form";
import LogInText from "./LogInText";

const LogIn = ({ setSide }) => {
  return (
    <div className="container" onClick={() => setSide(true)}>
      <div className="form-container">
        <LogInText />
        <Form />
      </div>
    </div>
  );
};

export default LogIn;
