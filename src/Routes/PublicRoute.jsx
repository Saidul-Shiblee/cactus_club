import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";

export const PublicRoute = ({ children}) => {
  const { isLoggedIn } = useGlobalContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
        if(location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === "/sign-up") {
          navigate("/");
        } else {
          navigate(-1)
        }
    }

  }, [isLoggedIn]);

  return children;
};
