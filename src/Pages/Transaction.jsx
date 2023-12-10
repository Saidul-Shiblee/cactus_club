import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import DepositeInputs from "../components/DepositeInputs";
import DepositQRCode from "../components/DepositQRCode";
import { useGlobalContext } from "../context/context";
import { getPlayerBalance, getPlayerWallet } from "../ApiFetcher/fetcher";
import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import History from "../components/History";

const Transaction = () => {
  const random = React.useRef(Date.now());
  const [currentForm,setCurrentForm]=useState('deposit')
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthToken, setCurrencyBalance, authToken } =
    useGlobalContext();

  //get Player Balance
  const { data, isLoading } = useSWR(["balance",random], getPlayerBalance(authToken));
  const { data: data1, isLoading: isLoading1 } = useSWR(
    ["wallet",random],
    getPlayerWallet(authToken)
  );

  
  console.log(data?.code,data1?.code)

  useEffect(() => {
   if (data?.code === -2 || data1?.code === -2) {
     setAuthToken("");
     setIsLoggedIn(false);
     setCurrencyBalance(null);
     localStorage.removeItem("cactus_club_token");
     localStorage.removeItem("cactus_club_currency_balance");
     navigate("/");
   }
  }, [data]);


  useEffect(() => {
    if (data && !isLoading) {
      setCurrencyBalance({
        ETHER: data?.data?.ETHER,
        USDC: data?.data?.USDC,
        USDT: data?.data?.USDT,
      });
    }
  }, [data, isLoading]);

  return (
    <MainLayout>
      <div className="flex items-center h-[34px] justify-center mt-[50px] md:mt-[93px] text-primary-title mb-[52px]">
        <div
          onClick={() => setCurrentForm("deposit")}
          className={
            currentForm === "deposit"
              ? "ignup-link font-poppins text-normal md:text-[24px] font-bold uppercase underline underline-offset-[12px] decoration-4 decoration-[#13BC87] cursor-pointer"
              : "ignup-link font-poppins text-normal md:text-[24px] font-bold uppercase hover:text-orange-secondary"
          }
        >
          Deposit
        </div>
        <div className="font-poppins text-normal md:text-[24px] font-bold uppercase px-[16px]">
          i
        </div>
        <button
          onClick={() => setCurrentForm("withdraw")}
          className={
            currentForm === "withdraw"
              ? "ignup-link font-poppins text-normal md:text-[24px] font-bold uppercase underline underline-offset-[12px] decoration-4 decoration-[#13BC87] cursor-pointer"
              : "ignup-link font-poppins text-normal md:text-[24px] font-bold uppercase hover:text-orange-secondary "
          }
        >
          Withdraw
        </button>
        <button className="font-poppins text-normal md:text-[24px] font-bold uppercase px-[16px]">
          i
        </button>
        <button
          onClick={() => setCurrentForm("history")}
          className={
            currentForm === "history"
              ? "ignup-link font-poppins text-normal md:text-[24px] font-bold uppercase underline underline-offset-[12px] decoration-4 decoration-[#13BC87] cursor-pointer"
              : "ignup-link font-poppins text-normal md:text-[24px] font-bold uppercase hover:text-orange-secondary "
          }
        >
          History
        </button>
      </div>
      {currentForm === "deposit" && (
        <Deposit
          data={data}
          isLoading={isLoading}
          data1={data1}
          isLoading1={isLoading1}
        />
      )}
      {currentForm === "withdraw" && (
        <Withdraw
          data={data}
          isLoading={isLoading}
          data1={data1}
          isLoading1={isLoading1}
          setCurrentForm={setCurrentForm}
        />
      )}
      {currentForm === "history" && <History />}
    </MainLayout>
  );
};

export default Transaction;
