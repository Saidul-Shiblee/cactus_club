import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const PrivateRoute = ({ children, isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return children;
};
