import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/Ui/InputField";
import UiButton from "../components/Ui/UiButton";
import { useForm } from "react-hook-form"
import { useState } from "react";
import Spinner from "../utilities/spinner";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import LoginModal from "../components/LoginModal";
import UiModal from "../components/Ui/UiModal";
import ModalImg from './../assets/image/modalimg.png'


const Login = () => {
  const [pending, setPending] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');


  const navigate = useNavigate();

  const {
    deviceInfo,
    clientInfo,
    setIsLoggedIn,
    setAuthToken,
    isLoggedIn,
    setCurrencyBalance,
  } =useGlobalContext()


  const openModal = () => {
      setModalOpen(true);
  };

  const closeModal = () => {
      setModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    getValues,
    formState: { errors },
    formState
  } = useForm();
  // console.log(formState.isValid) // false
  const onSubmit = async(data) => {
setPending(true)
    try {
      const res = await axios.post("https://apis.yummylabs.io/login", {
        Username: data.username,
        Password: data.password,
        Platform: deviceInfo,
        IP: clientInfo.deviceIP,
        Country: clientInfo.country
      });
      console.log("response", res.data);
      setAuthToken(res.data.data.Token)

      if (res?.data?.data?.Token && res?.data?.code === 1) {
        setIsLoggedIn(true);
        localStorage.setItem("cactus_club_token", res?.data?.data?.Token);

        setCurrencyBalance({
          ETHER: res?.data?.data?.ETHER,
          USDC: res?.data?.data?.USDC,
          USDT: res?.data?.data?.USDT,
        });
        if(res?.data?.code === -3){
          setErrMsg(res?.data?.msg);
        }

        localStorage.setItem(
          "cactus_club_currency_balance",
          JSON.stringify({
            ETHER: res?.data?.data?.ETHER,
            USDC: res?.data?.data?.USDC,
            USDT: res?.data?.data?.USDT,
          })
        );
        navigate(-1);
      }
      
    } catch (error) {
      console.log(error);
    } finally{
      setPending(false)
    }
  };
  return (
    <div className="w-full h-screen font-sans md:bg-cover bg-login-mobile md:bg-login relative bg-no-repeat">
      <div className="flex justify-end md:flex-1 md:h-full mx-auto absolute left-0 right-0 top-[138px] md:static">
        <div className="w-full md:w-[845px] rounded-t-[34px] md:rounded-tr-none md:rounded-l-[50px] bg-white flex md:justify-center flex-col md:pl-[85px] px-[15px] py-[32px] md:px-0 md:py-[114px]">
          <h4 className="text-center md:text-start signup-text font-luckiest text-[29.606px] font-normal">
            Cactus Club
          </h4>
          <div className="flex items-center h-[34px] justify-center md:justify-start">
            <Link
              className="signup-link font-poppins text-[24px] font-bold uppercase hover:border-b-2 hover:border-b-[#13BC87]"
              to="/login"
            >
              login
            </Link>
            <div className="font-poppins text-[24px] font-bold uppercase px-[16px]">
              i
            </div>
            <Link
              className="signup-link font-poppins text-[24px] font-bold uppercase hover:border-b-2 hover:border-b-[#13BC87]"
              to="/sign-up"
            >
              Sign Up
            </Link>
          </div>
          <h6 className="text-[32px] md:text-[60px] font-rubik uppercase font-normal cactus-text-color">
            Welcome to the Cactus club!
          </h6>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex flex-col mt-[24px]">
              <label
                htmlFor="username"
                className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
              >

                username
              </label>
              <input
                type="text"
                className={` w-full md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] ${getValues("username") ? "bg-orange-secondary" : 'bg-white'} cactus-text-color font-poppins text-[16px] font-black uppercase placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${errors?.username?.message ? "outline-none ring-1 ring-red-500 border-transparent" : "input-border"
                  }`}
                {...register("username")}
                name="username"
                required
              />
              <p className=" text-primary-title">{errors.username?.message}</p>
            </div>
            <div className="relative flex flex-col mt-[24px]">
              <label
                htmlFor="password"
                className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
              >
                password
              </label>
              <input
                type="password"
                className={`w-full md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] ${getValues("password") ? "bg-orange-secondary" : 'bg-white'} cactus-text-color font-poppins text-[16px] font-black uppercase placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${errors.password?.message ? "outline-none ring-1 ring-red-500 border-transparent" : "input-border"
                  }`}
                  {...register("password")}
                name="password"
                required
              />
              <p className=" text-primary-title">{errors.password?.message}</p>

            </div>
            <p className="text-end w-full md:w-[585px]">
              <Link
                className="text-under_line underline font-poppins font-bold text-[12px] uppercase"
                to="/"
              >
                forgot password?
              </Link>
            </p>
            <button
              type="submit"
              disabled = {
                errors?.username ||
                errors?.password
              }
              className={`hidden md:flex ${ formState?.isValid ? "hero-button text-white" : "bg-submit-button"} rounded-full px-[81px] items-center h-[63px] text-s-button-text font-poppins font-bold text-center text-[20px] uppercase mt-[10px]`}
              onClick={pending? null : (isLoggedIn?closeModal: openModal)}
            >
       {pending ? (
                  <Spinner />
                ) : (
                  <div className="flex">
                    Log In
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="h-min ml-[7px] mt-[12px]"
                    >
                      <path
                        d="M10 7.5V2.32843C10 0.546618 7.84572 -0.345716 6.58579 0.914214L1.41422 6.08578C0.154286 7.34571 1.04662 9.5 2.82843 9.5H8C9.10457 9.5 10 8.60457 10 7.5Z"
                        fill={`${
                          formState?.isValid
                            ? "#FFD55A"
                            : " #9FA3A9"
                        }`}
                      />
                    </svg>
                  </div>
                )}
            </button>
            <div>

            <UiModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="px-[118px] justify-center text-center">
                    <img src={ModalImg} className='mx-auto' alt="Modal image"/>
                    <h1 className='text-2xl font-rubik text-primary-title mt-[28px] uppercase'>Login Failed</h1>
                    <p className='text-stone-950 text-opacity-50'>Invalid username or password was entered. Please try again!</p>
                   <UiButton label="OK" onClose={closeModal} classes='!w-full h-16 mt-[30px] mb-[56px]'/>
                </div>
            </UiModal>
        </div>
            <div className="block md:hidden">
              <UiButton label="login" classes="w-full justify-center" />
            </div>
          </form>
          <p className="mt-[24px] md:mt-[14px] text-[16px] font-poppins uppercase font-bold text-primary-title text-center md:text-start">
            {`don't`} have an account?{" "}
            <Link className="text-link2" to="/sign-up">
              signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
