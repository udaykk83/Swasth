import React from "react";
import { Navigate } from "react-router-dom";

// route without checking the ids
function PublicRoute(props) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  } else {
    return props.children;
  }
}

export default PublicRoute;