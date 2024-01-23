import React from 'react';

const PlayKeno = () => {
    return (
        <div className='p-2 md:p-6'>
            <div className='flex flex-wrap gap-3'>
              <div className=" mx-auto flex gap-[3px] md:gap-[10px]">
                <div className='grid justify-start md:justify-between gap-[3px] md:gap-[10px]'>
                <div className='flex gap-[3px] md:gap-[10px]'>
                    <div className='w-[50px] h-[25px] md:w-[73px] md:h-8 bg-dark-green flex justify-center items-center text-white rounded-md font-rubik'>-</div>
                    <div className='w-[50px] h-[25px] md:w-[73px] md:h-8 bg-dark-green flex justify-center items-center text-white rounded-md font-rubik'>+</div>
                </div>
                <div className='w-[103.19px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik'>clear</div>
                </div>
                <div className="grid gap-[3px] md:gap-[10px]">
                <div className='w-full h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik'>min</div>
                <div className='w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik'>1/2</div>
                </div>
                <div className="grid gap-[3px] md:gap-[10px]">
                <div className='w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik'>max</div>
                <div className='w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik'>2x</div>
                </div>

              </div>
                <div className=' w-full lg:w-[279px] h-[73px] bg-primary-game hover:bg-dark-green rounded-md text-white text-4xl flex justify-center items-center cursor-pointer select-none font-rubik uppercase'>
                    play
                </div>
            </div>
        </div>
    );
};

export default PlayKeno;