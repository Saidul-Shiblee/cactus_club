import React from "react";

import DepositeInputs from "./DepositeInputs";
import DepositQRCode from "./DepositQRCode";


const Deposit = ({data,isLoading, data1,isLoading1}) => {


  return (
    <>
      <DepositeInputs
        balance={data}
        balanceLoading={isLoading}
        wallet={data1}
        walletLoading={isLoading1}
      />
      <DepositQRCode wallet={data1} walletLoading={isLoading1} />
    </>
  );
};

export default Deposit;
