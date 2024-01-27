import React from 'react';

const PlayKeno = ({auto}) => {
    return (
      <div className="p-2 md:p-6 w-full">
        <div className="flex flex-wrap gap-3 w-full">
          <div className=" flex gap-[3px] md:gap-[10px] w-full md:w-[491px]">
            <div className="grid gap-[3px] md:gap-[10px] w-1/3">
              <div className="flex gap-[3px] md:gap-[10px]">
                <div className="w-[50px] h-[25px] md:w-[73px] md:h-8 bg-dark-green flex justify-center items-center text-white rounded-md font-rubik">
                  -
                </div>
                <div className="w-[50px] h-[25px] md:w-[73px] md:h-8 bg-dark-green flex justify-center items-center text-white rounded-md font-rubik">
                  +
                </div>
              </div>
              <div className="w-[103.19px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik">
                clear
              </div>
            </div>
            <div className="grid gap-[3px] md:gap-[10px] w-1/3">
              <div className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-center">
                min
              </div>
              <div className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-center">
                1/2
              </div>
            </div>
            <div className="grid gap-[3px] md:gap-[10px] w-1/3  ">
              <div className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-end">
                max
              </div>
              <div className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-end">
                2x
              </div>
            </div>
          </div>
          <div
            className={`w-full md:w-[279px] h-[56px] md:h-[73px] bg-primary-game hover:bg-dark-green rounded-md text-white 
            ${auto ? "!text-[24px]" : ""}
            text-3xl md:text-4xl flex justify-center items-center cursor-pointer select-none font-rubik uppercase `}
          >
            {auto ? "start auto play" : "play"}
          </div>
        </div>
      </div>
    );
};

export default PlayKeno;