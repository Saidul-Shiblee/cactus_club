import React from "react";

import DepositeInputs from "./DepositeInputs";
import DepositQRCode from "./DepositQRCode";
import { useGlobalContext } from "../context/context";
import EmailVerification from "./EmailVerification";


const Deposit = ({data,isLoading, data1,isLoading1}) => {
  const {
    isEmailVarified, 
    setIsEmailVerified,
    
} = useGlobalContext()


  return (
    <>
    {
      isEmailVarified === true?
      <>
      <DepositeInputs
        balance={data}
        balanceLoading={isLoading}
        wallet={data1}
        walletLoading={isLoading1}
      />
      <DepositQRCode wallet={data1} walletLoading={isLoading1} />
      </>
      : <EmailVerification/>
    }
    
      
    </>
  );
};

export default Deposit;
