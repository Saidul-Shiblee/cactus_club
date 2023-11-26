import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const PublicRoute = ({ children, isLoggedIn }) => {
  const navigate = useNavigate();

  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn]);

  return children;
};
