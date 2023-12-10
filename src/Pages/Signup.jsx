import { NavLink, Link } from "react-router-dom";
import UiButton from "../components/Ui/UiButton";
import { useForm, useWatch } from "react-hook-form";
import React, { Component } from 'react';
import OtpInputForm from "../components/OtPInput";
import { useState, useEffect } from "react";
import axios from "axios";
import { RotateCcwIcon, X } from "lucide-react";
import Spinner from "../utilities/spinner";
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import Xicon from './../assets/icons/x.png';
import UiModal from "../components/Ui/UiModal";
import ModalImg from "./../assets/image/modalImg.png"




const Signup = () => {

  const [showModal, setShowModal] = useState(false)
  const [checkTerms, setCheckTerms] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [modalErrMsg, setModalErrMsg] = useState('');
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [congratsModalOpen, setCongratsModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setCongratsModalOpen(false)
  };


  const openModal = () => {
    setCongratsModalOpen(true);
  }

  const {
    deviceInfo,
    clientInfo,
    authToken,
    currencyBalance,
    isLoggedIn,
    setIsLoggedIn,
    setAuthToken,
    setCurrencyBalance,
  } = useGlobalContext();

  useEffect(() => {
    if (errMsg) {
      setTimeout(() => setErrMsg(""), 6000);
    }
  }, [errMsg]);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])
  useEffect(() => {
    const ReloadHref = document.getElementById("reload_href");
    const ParentDiv = ReloadHref.parentNode;
    const GrandDiv = ParentDiv.parentNode;
    console.log(GrandDiv)
    //  const ChildDiv = ParentDiv.children[1]
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19 7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7 7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83 1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.34 1.34 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.21 9.21 0 0 0 12.18 3 9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25");

    svg.appendChild(path);

    ReloadHref.appendChild(svg);

    ReloadHref.innerHTML = svg.outerHTML;

    GrandDiv.style.display = "flex";
    GrandDiv.style.justifyContent = "center";
    // ParentDiv.style.marginLeft = "15px"
    ReloadHref.style.marginLeft = 0;



  }, [])

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 5000);
    }
  }, [message])


  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    formState,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange"
  });





  const fieldValue = useWatch({
    control,
    name: ["email", "password", "username"],
    defaultValue: "",
  });







  const onSubmit = async (data) => {
    setPending(true)




    try {

      let user_captcha = document.getElementById('user_captcha_input').value;
      // console.log("userCaptha", user_captcha);

      if (validateCaptcha(user_captcha) === true) {
        loadCaptchaEnginge(6);
        const res = await axios.post("https://apis.yummylabs.io/signUp", {
          Email: data.email,
          Name: data.username,
          Password: data.password,
          // VerifyCode: otp,
          Platform: deviceInfo,
          IP: clientInfo.deviceIP,
          Country: clientInfo.country,
        })
        console.log(res)

        setAuthToken(res?.data?.data?.Token);

        if (res?.data?.data?.Token && res?.data?.code === 1) {
          setIsLoggedIn(true);
          // localStorage.setItem("cactus_club_isLoggedIn", true);
          localStorage.setItem("cactus_club_token", res?.data?.data?.Token);

          setCurrencyBalance({
            ETHER: res?.data?.data?.ETHER,
            USDC: res?.data?.data?.USDC,
            USDT: res?.data?.data?.USDT,
          });

          localStorage.setItem(
            "cactus_club_currency_balance",
            JSON.stringify({
              ETHER: res?.data?.data?.ETHER,
              USDC: res?.data?.data?.USDC,
              USDT: res?.data?.data?.USDT,
            })
          );
          navigate(-1);
          openModal()
        }


        if (res?.data?.code === -17) {
          setErrMsg("Wrong Verification code");
        }
        if (res?.data?.code === -3) {
          setModalErrMsg("Email/Name has already been registered.");
        }
        // document.getElementById('user_captcha_input').value = "";
      }

      else {
        setMessage('Captcha Does Not Match');
        document.getElementById('user_captcha_input').value = "";
      }

    } catch (error) {
      setErrMsg("Something went wrong!");
      console.log(error)
    } finally {
      setPending(false)
    }





  };


  return (
    <div className="w-full h-screen md:h-full font-sans md:bg-cover bg-signup-mobile md:bg-signup relative bg-no-repeat">
      <div className="flex justify-end md:flex-1 md:h-full mx-auto absolute left-0 right-0 top-[138px] md:static">
        <div className="w-full md:w-[845px] rounded-t-[34px] md:rounded-tr-none md:rounded-l-[50px] bg-white flex md:justify-center flex-col px-[15px] py-[32px] md:px-[85px] md:py-[114px]">
          <div className="flex justify-between">
            <h4 className="text-center md:text-start signup-text font-luckiest text-[29.606px] font-normal">
              Cactus Club
            </h4>
            <Link to={"/"}>
              <button className=" bg-gradient-bg rounded-md w-[44px] h-[44px] flex justify-center items-center">
                <img src={Xicon} />
              </button>
            </Link>
          </div>
          <div className="flex items-center h-[34px] justify-center md:justify-start mt-[52px]">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "ignup-link font-poppins text-[24px] font-bold uppercase underline underline-offset-[12px] decoration-4 decoration-[#13BC87] text-primary-title"
                  : "ignup-link font-poppins text-[24px] font-bold uppercase text-primary-title"
              }
              to="/login"
            >
              log in
            </NavLink>
            <div className="font-poppins text-[24px] font-bold uppercase px-[16px] text-primary-title">
              i
            </div>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "ignup-link font-poppins text-[24px] font-bold uppercase underline underline-offset-[12px] decoration-4 decoration-[#13BC87] text-primary-title"
                  : "ignup-link font-poppins text-[24px] font-bold uppercase text-primary-title"
              }
              to="/sign-up"
            >
              sign up
            </NavLink>
          </div>
          <h6 className="text-[32px] md:text-[60px] mt-[52px] font-rubik uppercase font-normal cactus-text-color">
            create account
          </h6>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <InputField label="username" type="text" error={false} {...register("username") }/> */}
              <div className="relative flex flex-col mt-[24px]">
                <label
                  htmlFor="username"
                  className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
                >
                  username
                </label>
                <input
                  type="text"
                  id="username"
                  className={` w-full md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] bg-white font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${errors?.username?.message
                    ? "outline-none ring-1 ring-red-500 border-transparent text-danger"
                    : "input-border  cactus-text-color"
                    }`}
                  {...register("username", {
                    minLength: {
                      value: 6,
                      message: "Min 6 chars.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Max 25 chars.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]{6,25}$/,
                      message:
                        "Use letters and numbers. Min 6 chars and Max 25 chars.",
                    },
                    required:
                      "Use letters and numbers. Min 6 chars and Max 25 chars.",
                  })}
                  name="username"
                />
                <p className=" text-danger px-[23px] md:px-[40px] italic">
                  {errors.username?.message}
                </p>
              </div>
              <div className="relative flex flex-col mt-[24px]">
                <label
                  htmlFor="password"
                  className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
                >
                  password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`w-full md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] bg-white cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${errors.password?.message
                    ? "outline-none ring-1 ring-red-500 border-transparent"
                    : "input-border"
                    }`}
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Min 8 chars.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Max 25 chars.",
                    },
                    required: "Min 8 chars and Max 25 chars.",
                  })}
                  name="password"
                />
                <p className=" text-danger px-[23px] md:px-[40px] italic">
                  {errors.password?.message}
                </p>
              </div>
              <div className="relative flex flex-col mt-[24px]">
                <label
                  htmlFor="email address"
                  className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
                >
                  email address
                </label>
                {/* ${
                    getValues("email") ? "bg-orange-secondary" : "bg-white"
                  } */}
                <input
                  id="email"
                  type="email"
                  className={`w-full  md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] bg-white font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${errors.email?.message
                    ? "outline-none ring-1 ring-red-500 border-transparent text-danger"
                    : "input-border cactus-text-color "
                    }`}
                  {...register("email", {
                    pattern: {
                      value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a Valid Email",
                    },
                    required: "Enter Your Email",
                  })}
                  name="email"
                />
                <p className="px-[23px] md:px-[40px] italic text-danger">{errors.email?.message}</p>
              </div>

              {/* Captcha  */}

              {/* <CaptchaTest /> */}
              <div>


                <div className="col mt-[24px]">
                  <p className="font-poppins font-bold uppercase text-[12px] text-primary-title mb-3">Enter Captcha code</p>
                  <div className="flex justify-between w-full md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] cactus-text-color font-poppins text-[16px] font-black focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent input-border">
                    <input
                      // placeholder="Enter Captcha Value"
                      id="user_captcha_input"
                      className=" outline-none w-[120px] md:w-full placeholder:text-primary-title"
                      name="user_captcha_input"
                      type="text"
                    ></input>
                    <div className="flex justify-center items-center">
                      <LoadCanvasTemplate reloadText={<RotateCcwIcon />} />
                    </div>
                  </div>
                </div>
                {message && (
                  <p className="px-[23px] md:px-[40px] italic text-danger">Captcha Does Not Match</p>
                )}
              </div>

              <div className=" text-yellow-900 text-xs md:text-base font-bold font-poppins uppercase leading-[14.40px] mt-3 md:mt-6">
                <input
                  type="checkbox"
                  onChange={() => setCheckTerms(!checkTerms)}
                  className="mr-[18px] mt-2 md:mt-0"
                />
                <span>I Agree to the </span>
                <Link to="/" className="text-emerald-500 underline uppercase">
                  Terms of Service
                </Link>
              </div>
              <div className=" text-yellow-900 text-xs md:text-base font-bold font-poppins uppercase leading-[14.40px] mt-3 md:mt-6">
                <input
                  type="checkbox"
                  onChange={() => setCheckPolicy(!checkPolicy)}
                  className="mr-[18px] mt-2 md:mt-0"
                />
                <span>I Agree to the </span>
                <Link to="/" className="text-emerald-500 underline uppercase">
                  privacy policy
                </Link>
              </div>
              {/* ${formState.i} */}
              {modalErrMsg && (
                <UiModal isOpen={isModalOpen} onClose={closeModal}>
                  <div className="px-[12px] md:px-[127px] w-[345px] md:w-[690px] justify-center text-center">
                    <img src={ModalImg} className="mx-auto" alt="Modal image" />
                    <div className="w-[321px] md:w-[453px] text-center">
                      <h1 className="text-2xl font-rubik text-primary-title mt-[28px] uppercase">
                       sign up failed
                      </h1>
                      <p className="text-stone-950 text-opacity-50">
                      Username or Email is already in use. Please try again!
                      </p>
                    </div>
                    <UiButton
                      label="OK"
                      onClose={closeModal}
                      classes="w-[321px] md:!w-[453px] !h-[64px] mt-[12px] mb-[56px]"
                      // onClick={setShowModal(false)}
                    />
                  </div>
                </UiModal>
              )}
              <button
                type="submit"
                disabled={
                  // !captcha ||
                  errors?.username ||
                  errors?.email ||
                  errors?.password ||
                  !checkPolicy ||
                  !checkTerms
                }
                className={`${formState?.isValid && checkPolicy && checkTerms
                  ? "hero-button text-white"
                  : " bg-submit-button"
                  } flex w-full justify-center rounded-full px-[100px] md:px-[81px]  md:w-[585px] items-center h-[63px] text-s-button-text font-poppins font-bold text-center text-[20px] uppercase mt-[60px]`}
              >
                {pending ? (
                  <Spinner />
                ) : (
                  <div className="flex">
                    sign up
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
                        fill={`${formState?.isValid && checkPolicy && checkTerms
                          ? "#FFD55A"
                          : " #9FA3A9"
                          }`}
                      />
                    </svg>
                  </div>
                )}
              </button>
              {/* <div className="block md:hidden" type="submit">
                <UiButton
                  label="sign up"
                  classes="w-full justify-center mt-[58px]"
                />
              </div> */}
              {/* {showModal ? (
                <OtpInputForm
                  email={fieldValue[0]}
                  name={fieldValue[2]}
                  password={fieldValue[1]}
                  setShowModal={setShowModal}
                  showModal={showModal}
                />
              ) : null} */}
            </form>
          </div>
          <p className="mt-[60px] text-[16px] font-poppins uppercase font-bold text-primary-title text-center md:text-start">
            Already have a account?{" "}
            <Link className="text-link2" to="/login">
              Log in
            </Link>
          </p>
          {/* <OtpInputForm/> */}
        </div>
      </div>


      <div>
        <UiModal isOpen={congratsModalOpen} onClose={closeModal}>
          <div className=" px-2 md:px-[118px] justify-center text-center">
            <img src={ModalImg} className="mx-auto" alt="Modal image" />
            <h1 className="text-2xl font-rubik text-primary-title mt-[28px] uppercase">
            congratulations!
            </h1>
            <p className="text-stone-950 text-opacity-50">
            Welcome to the club! Get ready to have some fun!
            </p>
            <UiButton
              label="OK"
              onClose={closeModal}
              classes="!w-full h-16 mt-[30px] mb-[56px]"
            />
          </div>
        </UiModal>
      </div>
    </div>
  );
};

export default Signup;
