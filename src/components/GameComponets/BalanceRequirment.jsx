import React from 'react';
import { useGlobalContext } from '../../context/context';

const BalanceRequirment = () => {
    const {currencyBalance, selectedCurrency} = useGlobalContext();
    return (
        <div className='pl-2 pb-2 md:pb-0 md:pl-6 flex flex-wrap gap-2 md:gap-4'>
            <div className='grid gap-3'>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Balance</h1>
                <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>
                    {
                        selectedCurrency =="ETH" && currencyBalance?.ETHER
                    }
                    {
                        selectedCurrency =="USDT" && currencyBalance?.USDT
                    }
                    {
                         selectedCurrency =="USDC" && currencyBalance?.USDC
                    }
                    
                </h5>
            </div>
            <div className='grid gap-3'>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Min Bet</h1>
                <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>10</h5>
            </div>
            <div className='grid gap-3'>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Max Bet</h1>
                <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>15,500,000</h5>
            </div>
            <div className='grid gap-3'>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Credit Conversion</h1>
                <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>10 Credits = 0.00002ETH</h5>
            </div>
        </div>
    );
};

export default BalanceRequirment;