import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import QRCode from 'qrcode.react';
import Skeleton from 'react-loading-skeleton';
import { useGlobalContext } from '../context/context';

const DepositQRCode = ({wallet,walletLoading}) => {
  const {selectedCurrency} = useGlobalContext();

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
          {/* <div> */}
            {/* a. ETH  */}
            {
              selectedCurrency === "ETH" && (
                <ul className="list-disc list-inside font-IBM font-[16px] mt-[58px] w-[345px] md:w-[561px] text-center ">
                <li className="mb-[20px]">
                  Send at least 0.01 ETH to this address. If you send less than 0.01
                  ETH, your account won’t be credited
                </li>
                <li className="mb-[20px]">
                  Only send ETH to this address. If you send other crypto tokens to
                  this address it can result in a loss of funds
                </li>
                <li className="mb-[20px]">
                  ETH Deposits will be credited after 1 network confirmation
                </li>
                <li className="">Once you have made a deposit, you can check the History tab to check the status of your deposit</li>
              </ul>
              )
            }
            {
              selectedCurrency === "USDC" && (
                <ul className="list-disc list-inside font-IBM font-[16px] mt-[58px] w-[345px] md:w-[561px] text-center ">
                <li className="mb-[20px]">
                Send at least 20 USDC to this address. If you send less than 20 USDC, your account will not be credited
                </li>
                <li className="mb-[20px]">
                Only send USDC to this address. If you send other crypto tokens to this address it can result in loss of funds
                </li>
                <li className="mb-[20px]">
                USDC deposits will be created after 1 network confirmation
                </li>
                <li className="">Once you have made a deposit, you can check the History tab to check the status of your deposit</li>
              </ul>
              )
            }

            {
              selectedCurrency === "USDT" && (
                <ul className="list-disc list-inside font-IBM font-[16px] mt-[58px] w-[345px] md:w-[561px] text-center ">
                <li className="mb-[20px]">
                Send at least 20 USDT to this address. If you send less than 20 USDT, your account will not be credited
                </li>
                <li className="mb-[20px]">
                Only send USDT to this address. If you send other crypto tokens to this address it can result in loss of funds
                </li>
                <li className="mb-[20px]">
                USDT deposits will be created after 1 network confirmation
                </li>
                <li className="">Once you have made a deposit, you can check the History tab to check the status of your deposit</li>
              </ul>
              )
            }
           
          {/* </div> */}
        </div>
        <div className="w-full bg-deposite-sm block md:hidden md:bg-none h-[210px] bg-cover bg-no-repeat"></div>
      </div>
    );
};

export default DepositQRCode;