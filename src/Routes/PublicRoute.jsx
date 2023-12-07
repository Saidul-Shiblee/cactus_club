import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";

export const PublicRoute = ({ children}) => {
  const { isLoggedIn } = useGlobalContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn]);

  return children;
};
