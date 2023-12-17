import React from 'react';
import Crash from './../assets/image/crash.svg';
import Dice from './../assets/image/dice.svg';
import Flip from './../assets/image/flip.svg';

const ComingSoon = () => {
    return (
      <div className="w-full mt-[57px] max-w-[1920px] mx-auto bg-orange-50 py-[80px] px-[15px] lg:px-[145px] lg:pt-[85px] lg:pb-[118px] flex flex-col  items-center">
        <h3 className="lg:text-6xl font-rubik text-primary-title text-center  text-[32px] uppercase mb-[32px] lg:mb-0">
          coming soon
        </h3>

        <div className="flex lg:flex-row flex-col justify-center lg:justify-between lg:items-end items-center w-full gap-6 lg:gap-7 h-min lg:h-[374px]">
          <div className="lg:w-[30%]  h-[131px]  w-full relative ">
            <img
              src={Crash}
              className="w-[120px] h-[131px] lg:w-[346.17px] lg:h-[325.82px] absolute z-50 lg:-top-[235px] lg:-right-[39px] right-6 top-0"
              alt="image"
            />
            <div className="w-full h-[131px] bg-white rounded-[20px] cs-shadow items-end inline-flex pb-3 pl-3 absolute top-0 left-0">
              <h3 className="text-orange-secondary text-[28px] lg:text-[32px] font-bold font-poppins uppercase leading-9 lg:mt-[72px]  mb-[27px] ml-[30px]">
                CRASH
              </h3>
            </div>
          </div>
          <div className="lg:w-[36%] h-[131px]  lg:h-[161px]  w-full relative">
            <img
              src={Dice}
              className="w-[174px] h-[120px] lg:w-[346.17px] lg:h-[325.82px] absolute z-50 right-0 top-2 lg:-top-[186px] lg:-right-[12px]"
              alt="image"
            />
            <div className="w-full h-[131px]  lg:h-[161px] bg-white rounded-[20px] cs-shadow items-end inline-flex pb-3 pl-3">
              <h3 className="text-lime-900 text-[32px] font-bold font-poppins uppercase leading-9 lg:mt-[72px]   mb-[27px] ml-[30px]">
                DICE
              </h3>
            </div>
          </div>
          <div className="lg:w-[30%] h-[131px]    w-full relative">
            <img
              src={Flip}
              className="w-[119.36px] h-[135px]  lg:w-[337px] lg:h-[370.82px] absolute z-50 lg:-top-[250px] lg:-right-[39px] right-6 top-2 "
              alt="image"
            />
            <div className="w-full h-[131px] bg-white rounded-[20px] cs-shadow items-end inline-flex pb-3 pl-3">
              <h3 className="text-orange-secondary text-[32px] font-bold font-poppins uppercase leading-9 lg:mt-[72px]    mb-[27px] ml-[30px]">
                flip
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ComingSoon;