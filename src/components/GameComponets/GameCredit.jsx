import React, { useState } from 'react';
import coinPot from "./../../assets/image/coinpot.png";
import minusIcon from "./../../assets/icons/minus.svg";
import plusIcon from "./../../assets/icons/plus.svg";

const GameCredit = () => {
    const [count, setCount] = useState(0);
    const [betsNumber, setBetsNumber] = useState(10);

    const handleMinus = () => {
        setCount(count - 1);
        if(count<=0){
            setCount(0)
        }
    }
    const handlePlus = () => {
        setCount(count + 1);
    }

    const decreaseBet = () => {
        setBetsNumber(betsNumber - 1);
        if(betsNumber <= 10){
            setBetsNumber(10);
        }
    }

    const increaseBet = () => {
        setBetsNumber(betsNumber + 1);
    }
    return (
        <div className='px-2 md:px-6'>
            <div className='flex flex-wrap lg:flex-nowrap gap-3'>
                <div className='w-full lg:w-[490px] bg-dark-green rounded-md text-white h-[150px] flex '>
                    <div className='bg-keno-coin-pot-lg bg-cover bg-no-repeat w-full h-full flex relative'>
                        <div className='pl-8 flex justify-center items-center'>
                            <div>
                                <h3 className='text-sm font-bold font-poppins uppercase'>bet size (credits)</h3>
                                <h3 className=' font-rubik text-[40px] text-shadow'>10000</h3>
                            </div>
                        </div>
                        <div className=' absolute right-0 bottom-0'>
                            <img src={coinPot} alt='icon' />
                        </div>
                    </div>
                </div>
                <div className='grid gap-[10px]'>
                    <div className='flex gap-[3px]'>
                        <div className='w-[248px] md:w-[610px] lg:w-[199px] h-[70px] bg-dark-green flex justify-center items-center rounded-tl-md rounded-bl-md shadow'>
                            <div>
                                <p className='text-white text-sm font-poppins text-center font-bold uppercase mb-2'>Randomly Pick</p>
                                <div className='flex mx-4 gap-6 bg-white bg-opacity-10 rounded-lg'>
                                    <div onClick={handleMinus} className='bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer select-none'>
                                        <img src={minusIcon} alt='icon' />
                                    </div>
                                    <div className=' text-white text-base font-normal font-rubik'>
                                        {count}
                                    </div>
                                    <div onClick={handlePlus} className='bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer select-none'>
                                        <img src={plusIcon} alt='icon' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[78px] h-[70px] bg-dark-green flex justify-center items-center rounded-tr-md rounded-br-md shadow'>
                            <div className="w-[73px] h-[46px] text-center text-white text-[15px] font-normal font-rubik  uppercase leading-none">
                                pick<br/>{count}<br/>me</div>
                        </div>
                    </div>
                    <div className='flex gap-[3px]'>
                        <div className='w-[248px] md:w-[610px] lg:w-[199px] h-[70px] bg-dark-green flex justify-center items-center rounded-tl-md rounded-bl-md shadow'>
                            <div>
                                <p className='text-white text-sm font-poppins text-center font-bold uppercase mb-2'>number of bets</p>
                                <div className='flex mx-4 gap-6 bg-white bg-opacity-10 rounded-lg'>
                                    <div onClick={decreaseBet} className='bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer'>
                                        <img src={minusIcon} alt='icon' />
                                    </div>
                                    <div className=' text-white text-base font-normal font-rubik'>
                                    {betsNumber}
                                    </div>
                                    <div onClick={increaseBet} className='bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer'>
                                        <img src={plusIcon} alt='icon' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[78px] h-[70px] bg-dark-green flex justify-center items-center rounded-tr-md rounded-br-md shadow'>
                            <div className="text-center text-white text-[15px] font-normal font-rubik  uppercase leading-none">
                               Add <br/> me</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default GameCredit;