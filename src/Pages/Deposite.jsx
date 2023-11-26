import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DepositeInputs from "../components/DepositeInputs";
import DepositQRCode from "../components/DepositQRCode";
import { useGlobalContext } from "../context/context";
import { getPlayerBalance, getPlayerWallet } from "../ApiFetcher/fetcher";
import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Deposite = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthToken, setCurrencyBalance } =
    useGlobalContext();

  //get Player Balance
  const { data, isLoading } = useSWR("balance", getPlayerBalance);
  const { data: data1, isLoading: isLoading1 } = useSWR(
    "wallet",
    getPlayerWallet
  );

  

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
      <DepositeInputs
        balance={data}
        balanceLoading={isLoading}
        wallet={data1}
        walletLoading={isLoading1}
      />
      <DepositQRCode wallet={data1} walletLoading={isLoading1} />
    </MainLayout>
  );
};

export default Deposite;
