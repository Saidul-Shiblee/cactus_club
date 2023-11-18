import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../assets/image/Loader.png";

const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Signup = lazy(() => import("../Pages/Signup"));
const FAQ = lazy(() => import("../Pages/FAQ"));

const MainRoutes = () => {
  return (
    <Suspense fallback={<Lodaer />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/faq" element={<FAQ />} />
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
