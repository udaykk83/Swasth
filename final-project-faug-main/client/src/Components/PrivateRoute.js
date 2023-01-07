import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../Store/userSlice.js";
import { showLoading, hideLoading } from "../Store/alertsSlice.js";
//private route which prechecks for id and allows 
// by validating the token present in the localStorage of the browser
function PrivateRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios.post("http://localhost:9001/user/userDetailsById",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear()
        navigate("/user/login");
      }
    } catch (error) {
      localStorage.clear()
      navigate("/user/login");
    }
  };



  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  //Either redirects to the home or login screens 
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/user/login" />;
  }
}

export default PrivateRoute;