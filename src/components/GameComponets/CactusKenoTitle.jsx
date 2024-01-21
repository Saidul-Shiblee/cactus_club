import React from 'react';
import cactusLogo from "./../../assets/image/cactus.png";

const CactusKenoTitle = () => {
    return (
        <div className='flex flex-wrap pt-[17px] mx-8 md:mx-0 gap-0 md:gap-4'>
            <div className='flex justify-center items-center'>
                <img src={cactusLogo} className='pl-[34px] h-8 md:h-[50px]' alt='cactus logo' />
            </div>
            <div className='flex justify-center items-center'>
                <h1 className="text-white text-2xl md:text-5xl font-normal font-rubik uppercase leading-[52.80px] shadow-text">cactus Keno</h1>
            </div>
            <div className="flex justify-center items-center mx-auto md:mx-0 gap-4">
                <h3 className='text-white underline cursor-pointer'>How To Play</h3>
                <div className='text-white'>I</div>
                <h3 className='text-white underline cursor-pointer'>Provably Fair</h3>
            </div>
        </div>
    );
};

export default CactusKenoTitle;