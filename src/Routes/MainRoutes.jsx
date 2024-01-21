import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../assets/image/Loader.png";
import { PrivateRoute } from "./PrivateRoute";

import { useGlobalContext } from "../context/context";
import { PublicRoute } from "./PublicRoute";
import KenoGame from "../Pages/KenoGame";


const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Signup = lazy(() => import("../Pages/Signup"));
const FAQ = lazy(() => import("../Pages/FAQ"));
const Transaction = lazy(() => import("../Pages/Transaction"));
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const TermsCondition = lazy(() => import("../Pages/TermsCondition"));
const News = lazy(() => import("../Pages/News"));
const Support = lazy(() => import("../Pages/Support"));
const GameInfo = lazy(() => import("../Pages/GameInfo"));



const MainRoutes = () => {

 
  return (
    <Suspense fallback={<Lodaer />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/faq" element={<FAQ />} />

        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsCondition />} />
        <Route path="/news" element={<News />} />
        <Route path="/support" element={<Support />} />
        <Route path="/gameinfo" element={<GameInfo />} />
        <Route path="/keno" element={<KenoGame/>}/>
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
