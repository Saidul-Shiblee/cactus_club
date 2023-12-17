import React, { useEffect, useState } from "react";
import { ContextProvider, useGlobalContext } from "../context/context";
import OtpInput from "react-otp-input";
import axios from "axios";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OtpInputForm({
  email,
  password,
  name,
  showModal,
  setShowModal,
}) {
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
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    setPending(true);
    try {
      const res = await axios.post("https://apis.yummylabs.io/signUp", {
        Email: email,
        Name: name,
        Password: password,
        VerifyCode: otp,
        Platform: deviceInfo,
        IP: clientInfo.deviceIP,
        Country: clientInfo.country,
      });

      setAuthToken(res?.data?.data?.Token);

      if (res?.data?.data?.Token && res?.data?.code===1) {
        setIsLoggedIn(true);
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
        setShowModal(false);
        navigate(-1);
      }

      if (res?.data?.code === -17) {
        setErrMsg("Wrong Verification code");
      }
     
    } catch (error) {
      setErrMsg("Something went wrong!");
      console.log(error);
      setPending(false);
    }finally{
      setPending(false);
    }
  };

    useEffect(() => {
      if (errMsg) {
        setTimeout(() => setErrMsg(""), 6000);
      }
    }, [errMsg]);


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  ">
        <div className="relative w-[350px] md:w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className=" p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-xl font-semibold">Enter Verification Code</h3>
              {errMsg && (
                <div className="px-2 py-1 bg-red-300/30 rounded-md text-xs  text-red-500 flex gap-4 justify-between items-center  transform">
                  <p className=" text-center">{errMsg}</p>
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setErrMsg(null)}
                  />
                </div>
              )}
            </div>
            {/*body*/}
            <div className="relative p-6 justify-center mx-auto otp">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => handleSignUp(e)}
                // onClick={() => setShowModal(false)}
              >
                {pending ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
