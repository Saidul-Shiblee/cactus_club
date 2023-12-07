import React from "react";
import WithDrawForm from "./WithDrawForm";



const Withdraw = ({ data, isLoading, data1, isLoading1, setCurrentForm }) => {
  return (
    <>
      <WithDrawForm
        balance={data}
        balanceLoading={isLoading}
        wallet={data1}
        walletLoading={isLoading1}
        setCurrentForm={setCurrentForm}
      />
    </>
  );
};

export default Withdraw;
