import React, { useEffect, useState } from 'react';
// import QRCode from './../assets/image/qr-code.png';
import axios from 'axios';
import useSWR from 'swr';
// import { getPlayerWallet } from '../ApiFetcher/fetcher';
import QRCode from 'qrcode.react';
import Skeleton from 'react-loading-skeleton';

const DepositQRCode = ({wallet,walletLoading}) => {

    return (
      <div className="flex flex-col mt-[35px] items-center bg-none md:bg-deposite-lg bg-cover bg-no-repeat h-full md:h-[100vh] ">
        <div className="text-center ">
          <h1 className="font-bold text-[24px] text-primary-title font-poppins uppercase">
            scan qr code
          </h1>
          <p className="font-[16px]">to deposit to this address</p>
        </div>
        <div className="w-full flex flex-col  items-center">
          <div className="border border-[#EDEDED] rounded-[10px] flex justify-center items-center p-[30px] mt-[12px] h-[154px] w-[154px]">
            {wallet?.data?.wallet && !walletLoading && (
              <QRCode
                className=" h-[122px] w-[122px] "
                value={wallet?.data?.wallet}
              />
            )}
            {!wallet?.data?.wallet && walletLoading && (
              <Skeleton count={1} style={{ width: "122px", height: "122px" }} />
            )}
          </div>
          <ul className="list-disc list-inside font-IBM font-[16px] mt-[58px] w-[345px] md:w-[561px] text-center ">
            <li className="mb-[20px]">
              Send at least 0.01 ETH to this address. if you send less than 0.01
              ETH, your account won’t be credited
            </li>
            <li className="mb-[20px]">
              Only send ETH to this address. if you send other crypto tokens to
              this address it can result in a loss of funds
            </li>
            <li className="mb-[20px]">
              ETH Deposits will be credited after 1 network confirmation
            </li>
            <li className="mb-[20px]">
              New Deposit addresses can only be generated once a week
            </li>
            <li className="">You can close this window at any time</li>
          </ul>
        </div>
        <div className="w-full bg-deposite-sm block md:hidden md:bg-none h-[210px] bg-cover bg-no-repeat"></div>
      </div>
    );
};

export default DepositQRCode;