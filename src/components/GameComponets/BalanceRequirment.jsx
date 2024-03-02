import React from 'react';
import { useGlobalContext } from '../../context/context';
const BalanceRequirment = () => {
    const {currencyBalance, selectedCurrency} = useGlobalContext();
    return (
        <div className='pl-2 pb-2 md:pb-0 md:pl-6 flex flex-wrap gap-2 md:gap-4'>
            <div>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Balance</h1>
                <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>
                    {
                        selectedCurrency =="ETH" && ((currencyBalance?.ETHER /0.00002)*10)
                    }
                    {
                        selectedCurrency =="USDT" && ((currencyBalance?.USDT /0.00002)*10)
                    }
                    {
                         selectedCurrency =="USDC" && ((currencyBalance?.USDC /0.00002)*10)
                    }
                </h5>
            </div>
            <div>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Min Bet</h1>
                <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>10</h5>
            </div>
            <div>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Max Bet</h1>
                <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>15,500,000</h5>
            </div>
            <div>
                <h1 className='text-teal-600 text-[11px] md:text-sm font-bold font-poppins italic'>Credit Conversion</h1>
                {
                    selectedCurrency =="ETH" &&  <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>10 Credits = 0.00002 ETH</h5>
                }
                {
                    selectedCurrency =="USDT" && <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>10 Credits = 0.1 USDT</h5>
                }
                {
                    selectedCurrency =="USDC" && <h5 className='text-teal-600 text-[11px] md:text-sm font-poppins leading-3'>10 Credits = 0.1 USDC</h5>
                }
                
            </div>
        </div>
    );
};
export default BalanceRequirment;