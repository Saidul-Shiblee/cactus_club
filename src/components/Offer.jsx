import React from 'react';
import Reffels from './../assets/image/reffels.png';
import Transictions from './../assets/image/transictions.png';
import ExlclusiveStar from './../assets/image/exclusiveStar.png';

const Offer = () => {
    return (
      <div className="px-[15px] py-[90px] sm:p-[145px] bg-white w-full grid  lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-1 grid-cols-1  gap-20 lg:gap-14">
        <div className="h-[311px] lg:h-[388px]  card-shadow rounded-lg relative">
          <div className="pt-[34px] px-[20px]  justify-start items-center flex flex-col gap-4">
            <img
              className="absolute w-[126px] md:w-[206.095px]   bottom-[-41px] -translate-x-1/2 left-1/2"
              src={Reffels}
              alt="card"
            />

            <h1 className=" text-center text-[28px] uppercase text-secondary-title font-poppins font-semibold leading-[44.80px] sm:text-[28px]">
              Exclusive Raffles
            </h1>
            <p className=" text-secondary-title font-normal text-base font-poppins leading-relaxed px-[5px] text-center">
              Gain extra chances to win with our raffle draws. The more you play
              the more chances to win!
            </p>
          </div>
        </div>

        <div className="h-[311px] lg:h-[388px]  card-shadow rounded-lg relative">
          <div className="pt-[34px] px-[20px]  justify-start items-center flex flex-col gap-4">
            <img
              className="absolute w-[126px] md:w-[206.095px]   bottom-[-41px] -translate-x-1/2 left-1/2"
              src={Transictions}
              alt="card"
            />

            <h1 className=" text-center text-[28px] uppercase text-secondary-title font-poppins font-semibold leading-[44.80px] sm:text-[28px]">
              Effortless Transactions
            </h1>
            <p className=" text-secondary-title font-normal text-base font-poppins leading-relaxed px-[5px] text-center">
              Forget about gas fees and focus on the fun with our managed
              wallets!
            </p>
          </div>
        </div>
        <div className="h-[311px] lg:h-[388px]  card-shadow rounded-lg relative">
          <div className="pt-[34px] px-[20px]  justify-start items-center flex flex-col gap-4">
            <img
              className="absolute w-[126px] md:w-[206.095px]   bottom-[-41px] -translate-x-1/2 left-1/2"
              src={ExlclusiveStar}
              alt="card"
            />

            <h1 className=" text-center text-[28px] uppercase text-secondary-title font-poppins font-semibold leading-[44.80px] sm:text-[28px]">
              Low House Edge
            </h1>
            <p className=" text-secondary-title font-normal text-base font-poppins leading-relaxed px-[5px] text-center">
              Win more with us with our low house edge starting at 1%
            </p>
          </div>
        </div>
      </div>
    );
};

export default Offer



  