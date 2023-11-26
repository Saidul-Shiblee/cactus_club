import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../assets/image/Loader.png";
import { PrivateRoute } from "./PrivateRoute";

import { useGlobalContext } from "../context/context";
import { PublicRoute } from "./PublicRoute";


const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Signup = lazy(() => import("../Pages/Signup"));
const FAQ = lazy(() => import("../Pages/FAQ"));
const Deposite = lazy(() => import("../Pages/Deposite"));
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const TermsCondition = lazy(() => import("../Pages/TermsCondition"));



const MainRoutes = () => {

   const { isLoggedIn } = useGlobalContext();
 
  return (
    <Suspense fallback={<Lodaer />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/sign-up"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/faq" element={<FAQ />} />

        <Route
          path="/deposite"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Deposite />
            </PrivateRoute>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsCondition />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;

function Lodaer() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white flex justify-start items-center">
      <img
        className="w-[100px] h-[100px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
        src={Loader}
      />
    </div>
  );
}
