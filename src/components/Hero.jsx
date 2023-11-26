// import React from "react";
import BgImageDestop from "../assets/image/Rectangle281.svg";
import BgImageMobile from "../assets/image/hero_bg_mobile.png";
import cactusImage from "../assets/image/cactus_long2.svg";
import UiButton from "./Ui/UiButton";
import {Link} from 'react-router-dom';

function Hero() {


  return (
    <div className="relative">
      <div className="hidden md:block w-full bg-hero-lg h-[752px] relative bg-no-repeat  bg-cover">
        <div className="absolute z-[1] bottom-0 left-0">
          <img
            src={cactusImage}
            alt="Snow"
            className="w-full h-[248px] md:h-[496px]"
          />
        </div>
      </div>

      <div className="block md:hidden w-full bg-hero-sm h-[492px] relative bg-no-repeat  bg-cover">
        <div className="absolute z-[1] bottom-0 left-0">
          <img
            src={cactusImage}
            alt="Snow"
            className="w-full h-[248px] md:h-[496px]"
          />
        </div>
      </div>
      <div className="z-[2] absolute top-[40px] lg:top-[154.36px] px-4 lg:px-[145px]">
        <h1 className="text-[40px] md:text-[50px] lg:text-[80px] font-rubik text-white shadow-text uppercase font-normal md:leading-[60px]">
          Cactus Club
        </h1>
        <h1 className="text-[32px] md:text-[40px] lg:text-[60px] font-rubik text-white shadow-text uppercase font-normal md:leading-[60px] pt-[5px]">
          get stuck on the fun!
        </h1>
        <p className="hero-text-color font-poppins font-semibold text-[16px] uppercase pt-[10px]">
          quench your thirst on our growing lineup of crypto games!
        </p>
        <Link
          to="/deposite"
          className="flex items-center mt-[40px] md:mt-[32px] w-full justify-center md:block md:w-min"
        >
          <UiButton label="Deposit & Play"  />
        </Link>
      </div>
    </div>
  );
}

export default Hero;
