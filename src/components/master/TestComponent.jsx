import React from "react";

const TestComponent = ({ openSide }) => {
  return (
    <div
      style={
        openSide
          ? { marginLeft: "200px", transition: ".3s ease" }
          : { marginLeft: "20px", transition: ".3s ease" }
      }
    >
      TestComponent
    </div>
  );
};

export default TestComponent;
