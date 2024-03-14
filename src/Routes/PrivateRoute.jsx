import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";

export const PrivateRoute = ({ children }) => {
     const { isLoggedIn } = useGlobalContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    
  }, [isLoggedIn]);

  return children;
};
