import React, { useEffect, useState } from 'react';
import QRCode from './../assets/image/qr-code.png';
import axios from 'axios';
import useSWR from 'swr';
// import { getPlayerWallet } from '../ApiFetcher/fetcher';
// import QRCode from 'qrcode.react';

const DepositQRCode = () => {
    // const { data: data2 } = useSWR('wallet', getPlayerWallet);
    const [playerWalletQr, setPlayerWalletQr] = useState();
    const getPlayerWalletsQR = async() => {
        try {
         const res = await axios.get("https://apis.yummylabs.io/getPlayerWallet", {
             headers: {
                 "Authorization": localStorage.getItem("cactus_club_token")
             }
         })
         // console.log(res.data.data.wallet)
         setPlayerWalletQr(res.data);
        } catch (error) {
         console.log(error)
        }

     }
     useEffect(() => {
         // setPlayerWallet(getPlayerWallet);
         // console.log(getPlayerWallet);
         getPlayerWalletsQR();
     },[])
    // console.log(data2)
    return (
        <div>
            <div className='text-center mt-[35px]'>
                <h1 className="font-bold text-[24px] text-primary-title font-poppins uppercase">scan qr code</h1>
                <p className='font-[16px]'>to deposit to this address</p>
            </div>
            <div className='text-center justify-center bg-none md:bg-deposite-lg bg-cover bg-no-repeat h-full md:h-[100vh] w-full'>
                <img src={QRCode} className='justify-center mx-auto' alt='qr code' />
                {/* <div style={{ height: "116px", margin: "0 auto", width: "116px" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={data?.data?.wallet}
                        viewBox={`0 0 256 256`}
                    />
                </div> */}
                {/* <div>
                    <QRCode value={playerWalletQr?.data?.wallet}/>
                </div> */}
                <ul className='list-disc list-inside font-IBM font-[16px] mt-[58px] mx-2 md:mx-[440px] '>
                    <li className=''>Send at least 0.01 ETH to this address. if you send less than 0.01 ETH, your account won’t be credited</li>
                    <li className=''>Only send ETH to this address. if you send other crypto tokens to this address it can result in a loss of funds</li>
                    <li className=''>ETH Deposits will be credited after 1 network confirmation</li>
                    <li className=''>New Deposit addresses can only be generated once a week</li>
                    <li className=''>You can close this window at any time</li>
                </ul>
                <div className=' bg-deposite-sm md:bg-none h-[210px] bg-no-repeat'>

                </div>
            </div>
        </div>
    );
};

export default DepositQRCode;