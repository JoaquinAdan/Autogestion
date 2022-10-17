import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({Component}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />
    //return <Route path="/home" element={Component} />;
  }

  return <Component/>

};

/*function ProtectedRoute(component) {
    return function Route() {
        return <></>
    }
}*/

export default ProtectedRoute;
