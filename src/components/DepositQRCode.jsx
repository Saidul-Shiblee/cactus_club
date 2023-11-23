import React from 'react';
import QRCode from './../assets/image/qr-code.png';

const DepositQRCode = () => {
    return (
        <div>
            <div className='text-center mt-[35px]'>
                <h1 className="font-bold text-[24px] text-primary-title font-poppins uppercase">scan qr code</h1>
                <p className='font-[16px]'>to deposit to this address</p>
            </div>
            <div className='text-center justify-center bg-none md:bg-deposite-lg bg-cover bg-no-repeat h-full md:h-[100vh] w-full'>
                <img src={QRCode} className='justify-center mx-auto' alt='qr code' />
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