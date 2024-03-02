import React, { useState } from 'react';
import coinPot from "./../../assets/image/coinpot.png";
import minusIcon from "./../../assets/icons/minus.svg";
import plusIcon from "./../../assets/icons/plus.svg";
import { useGlobalContext } from '../../context/context';
import { GameNumber } from '../../assets/data/local.db';
const GameCredit = ({setAuto, auto, gameNumbers, setGameNumbers, count, setCount}) => {
  const {
    betsNumber,
    setBetsNumber,
    betSize,
    selectedNumbers,
    setSelectedNumbers,
  } = useGlobalContext();
    const handleMinus = () => {
        setCount(pv=>pv-1);
        if(count<=0){
            setCount(0)
        }
    }
    const handlePlus = () => {
        setCount(pv=>pv+1);
        if(count>=10){
          setCount(10);
        }
    }
    const increaseBetNumbers = () => {
      setBetsNumber(betsNumber + 1);
    }
    const decreaseBetNumbers = () => {
      setBetsNumber(betsNumber - 1);
      if(betsNumber<=0){
        setBetsNumber(0);
      }
    }
    const selectRandomElements = () => {
      console.log("click..")
      if(selectedNumbers.length > 0) {
        setGameNumbers(GameNumber);
        setSelectedNumbers([]);
      } 
      if(selectedNumbers.length <= 0) {
        const randomSelect = new Set();
        while (randomSelect.size < count) {
          randomSelect.add(Math.floor(Math.random() * gameNumbers.length));
        }
        setSelectedNumbers([...randomSelect]);
        const newData = gameNumbers.map((el, index) => {
          if (randomSelect.has(index)) {
            return { ...el, selected: true };
          } else {
            return el;
          }
        });
        setGameNumbers(newData);
      }
    };
    const handleAutoBet = () => {
      if(betsNumber == 0) {
        setAuto(false)
      } else {
        setAuto(!auto)
      }
    }
    return (
      <div className="px-2 md:px-6 w-full">
        <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full">
          <div className="w-full lg:w-[490px] bg-dark-green rounded-md text-white h-[150px] flex ">
            <div className="bg-keno-coin-pot-lg bg-cover bg-no-repeat w-full h-full flex relative">
              <div className="pl-8 flex justify-center items-center">
                <div>
                  <h3 className="text-sm font-bold font-poppins uppercase">
                    bet size (credits)
                  </h3>
                  <h3 className=" font-rubik text-[40px] text-shadow">{betSize}</h3>
                </div>
              </div>
              <div className=" absolute right-0 bottom-0">
                <img src={coinPot} alt="icon" />
              </div>
            </div>
          </div>
          <div className="grid gap-[10px] w-full lg:w-[280px]">
            <div className="flex gap-[3px]">
              <div className="w-[77%] md:w-[199px] h-[70px] bg-dark-green flex justify-center items-center rounded-tl-md rounded-bl-md shadow">
                <div>
                  <p className="text-white text-sm font-poppins text-center font-bold uppercase mb-2">
                    Randomly Pick
                  </p>
                  <div className="flex gap-6 bg-white bg-opacity-10 rounded-lg">
                    <div
                      onClick={handleMinus}
                      className="bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer select-none transition-all ease-in-out duration-300 transform hover:scale-105 "
                    >
                      <img src={minusIcon} alt="icon" />
                    </div>
                    <div className=" text-white text-base font-normal font-rubik">
                      {count}
                    </div>
                    <div
                      onClick={handlePlus}
                      className="bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer select-none ml-3 transition-all ease-in-out duration-300 transform hover:scale-105"
                    >
                      <img src={plusIcon} alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={selectRandomElements} className={`${count!=0? "hover:bg-green-hover cursor-pointer	": "cursor-not-allowed	"}w-[23%] bg-dark-green md:w-[78px] h-[70px] flex justify-center items-center rounded-tr-md rounded-br-md shadow transition-all ease-in-out duration-300 transform hover:scale-105`}>
                <div className="w-[73px] h-[46px] text-center text-white text-[15px] font-normal font-rubik  uppercase leading-none select-none">
                  pick
                  <br />
                  For
                  <br />
                  me
                </div>
              </div>
            </div>
            <div className="flex gap-[3px] w-full">
              <div className="w-[77%] md:w-[199px] h-[70px] bg-dark-green flex justify-center items-center rounded-tl-md rounded-bl-md shadow">
                <div>
                  <p className="text-white text-sm font-poppins text-center font-bold uppercase mb-2">
                    number of bets
                  </p>
                  <div className="flex ml-3 gap-6 bg-white bg-opacity-10 rounded-lg">
                    <div onClick={decreaseBetNumbers} className="bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer">
                      <img src={minusIcon} alt="icon" />
                    </div>
                    <div className=" text-white text-base font-normal font-rubik">
                      {betsNumber}
                    </div>
                    <div onClick={increaseBetNumbers} className="bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer ml-3">
                      <img src={plusIcon} alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`w-[23%] md:w-[78px] h-[70px] ${
                  auto ? "bg-[#955B38]" : "bg-dark-green"
                }  flex justify-center items-center rounded-tr-md rounded-br-md shadow button-transition hover:bg-green-hover transition-all ease-in-out duration-300 transform hover:scale-105`}
              >
                <button
                  onClick={handleAutoBet}
                  className="text-center text-white text-[15px] font-normal font-rubik  uppercase leading-none"
                >
                  Auto <br /> {auto ? "On" : "Off"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default GameCredit;