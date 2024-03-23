import React, { useEffect, useState } from "react";
import { GameNumber, betXData } from "../../assets/data/local.db";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSound from 'use-sound';
import deSelectedKenoSound from './../../assets/game_sounds/Deselect_Keno_Number.mp3';
import selectedKenoSound from './../../assets/game_sounds/Select_Keno_Number.mp3';

// import audio from "./../../assets/game_sounds/Select_Keno_Number.mp3"
const CatusGame = ({ gameNumbers, setGameNumbers,progress, resultModal, setResultModal, setProgress, winnerCredit, gameSelectedNumbers, setGameSelectedNumbers, betAmount, setBetAmount, notSelectedTielsError, setNotSelectedTielsError, InsufficientFundsError,
  setInsufficientFundsError }) => {
  const {
    isLoggedIn,
    selectedNumbers,
    setSelectedNumbers,
    selectedLength,
    setSelectedLength,
    selectedBetData,
    setSelectedBetData,
    selectedCurrency,
    betSize,

  } = useGlobalContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [deselectedPlay] = useSound(deSelectedKenoSound);
  const [selectedPlay] = useSound(selectedKenoSound);
  const [maxNumberError, setMaxNumberError] = useState(false);



  const navigate = useNavigate();
  const ethBetAmount = (betSize / 10) * 0.00002;
  const usdcUsdtAmount = (betSize / 10) * 0.1;

  const onClose = () => {
    setGameNumbers(gameSelectedNumbers)
    setProgress(0)
    // setSelectedBetData({});
    setResultModal(false);
  }

  const maxNumberErrorModalClose = () => {
    setMaxNumberError(false);
    setNotSelectedTielsError(false);
    setInsufficientFundsError(false);
  }



  //Saidul
  const handleClick = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const selectedCount = gameNumbers.filter((el) => el.selected).length;

      if (
        selectedCount >= 10 &&
        !gameNumbers.find((el) => el.id === id && el.selected)


      ) {
        // toast.error("Max 10 numbers selected!");
        setMaxNumberError(true)
        return;
      }
      if (selectedNumbers.includes(id)) {
        setSelectedNumbers(selectedNumbers.filter(num => num !== id));
        deselectedPlay()
        setSelectedLength([...selectedLength.slice(0, -1)])
      } else {
        if (selectedNumbers.length < 10) {
          const newSelectedNumbers = [...selectedNumbers, id];
          setSelectedNumbers(newSelectedNumbers);
          selectedPlay();
          setSelectedLength([...selectedLength, newSelectedNumbers.length]);
        }
      }
      setGameNumbers((pv) =>
        pv.map((el) => {
          if (el.id === id && !el.selected) {
            return { ...el, selected: true };
          } else if (el.id === id && el.selected) {
            return { id: id };
          } else {
            return el;
          }
        })
      );

    }
  };

useEffect(() => {
  setGameSelectedNumbers(gameNumbers);
},[gameNumbers])

  useEffect(() => {
    const selectedData = betXData.find(
      (item) => item.id === selectedNumbers.length
    );
    setSelectedBetData(selectedData)
  }, [selectedNumbers])


  return (
    <div>
      <div>
        <div className="relative grid grid-cols-8 lg:grid-cols-10 gap-2 p-3 lg:p-6">
          {gameNumbers.map(
            ({ id, matched, existInResult, selected, order }, index) => (
              <AnimatedDiv
                handleClick={handleClick}
                key={id}
                id={id}
                selected={selected}
                order={order}
                delay={400}
                matched={matched}
                existInResult={existInResult}
              />
            )
          )}
          <div>
            {/* Modal  */}
            {resultModal && (winnerCredit > 0) && (
              <div className="absolute inset-0  z-[10]">
                <div className="flex items-center justify-center mt-36">
                  <div className="absolute z-50 bg-[#46CBA1E5] p-3 mx-2 md:mx-0 rounded-md shadow">
                    <div className="flex justify-end">
                      <button
                        onClick={onClose}
                        className="absolute top-[-10px] right-[-10px] text-white bg-emerald-400 w-7 h-7 rounded-full"
                      >
                        X
                      </button>
                    </div>
                    <div className="mt-4 min-w-[282px]">
                      <p className=" font-poppins font-bold text-white text-xl uppercase text-center">
                        You Won
                      </p>
                      <p className="mt-2 font-poppins font-bold text-white text-[12px] uppercase text-center">
                        {selectedCurrency == "ETH" && ((betSize / 10) * 0.00002) * winnerCredit}
                        {selectedCurrency == "USDT" && ((betSize / 10) * 0.1)*winnerCredit}
                        {selectedCurrency == "USDC" && ((betSize / 10) * 0.1)*winnerCredit}
                        {selectedCurrency}
                      </p>
                      <p className=" font-poppins font-bold text-white text-2xl uppercase text-center">
                        {selectedCurrency == "ETH" && (winnerCredit * ethBetAmount * 500000).toFixed(2)}
                        {(selectedCurrency == "USDC" ||
                          selectedCurrency == "USDT") &&
                          parseFloat(winnerCredit * usdcUsdtAmount * 100).toFixed(2)}
                        <span> </span> Credits
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Max number error modal  */}
            {(InsufficientFundsError ||
              notSelectedTielsError ||
              maxNumberError) && (
              <div className="absolute inset-0  z-[10]">
                <div className="flex items-center justify-center mt-36">
                  <div className="absolute z-50 bg-red-700 bg-opacity-90 p-3 mx-2 md:mx-0 rounded-md shadow">
                    <div className="flex justify-end">
                      <button
                        onClick={maxNumberErrorModalClose}
                        className="absolute top-[-10px] right-[-10px] text-white bg-red-700 w-7 h-7 rounded-full"
                      >
                        X
                      </button>
                    </div>
                    <div className="mt-4 w-[282px]">
                      <p className=" font-poppins font-bold text-white text-xl text-center">
                        OOPS!
                      </p>
                      <p className=" font-poppins font-bold text-white text-2xl text-center leading-snug">
                        {maxNumberError &&
                          "You cannot select more than 10 numbers"}
                        {notSelectedTielsError &&
                          "Please select 1 to 10 numbers to begin"}
                        {InsufficientFundsError && "Insufficient funds"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="relative h-16 px-3 md:px-[24px]">
          <div className="w-full relative rounded-md overflow-hidden">
            <div
              className={`w-full relative z-30  ${
                progress > 0
                  ? "text-[#955B38] rounded-md bg-primary-game"
                  : "text-primary-game"
              } text-[8px] md:text-xs font-normal grid gap-2 font-rubik uppercase text-center  overflow-hidden `}
            >
              {selectedNumbers.length > 0 ? (
                <div className={`flex justify-between items-center w-full `}>
                  {selectedBetData?.bet.map((value, index) => {



                    const orginalProgress = progress ? progress + 10 : 0;

                    console.log(orginalProgress / 10 - 1 === index);
                    return (
                      <div
                        style={{
                          width: `${100 / (selectedNumbers.length + 1)}%`,
                        }}
                        className={`flex flex-col py-1 ${
                          index + 1 <= orginalProgress / 10
                            ? "bg-primary-game"
                            : "bg-[#FFE2C9]"
                        } ${
                          orginalProgress / 10 - 1 === index
                            ? " rounded-r-md   "
                            : ""
                        }

                        `}
                        key={index}
                      >
                        <h6>{value}</h6>
                        <h6>{index}</h6>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="bg-[#FFE2C9] py-3 rounded-md">
                  Select between 1 and 10 numbers to play!
                </p>
              )}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CatusGame;
const AnimatedDiv = ({
  id,
  matched,
  existInResult,
  selected,
  order,
  delay,
  handleClick,
}) => {
  const [displayContent, setDisplayContent] = useState(id);
  useEffect(() => {
    if (!matched && existInResult && !selected) {
      const timeout = setTimeout(() => {
        setDisplayContent("X");
      }, delay * order);
      return () => clearTimeout(timeout);
    } else {
      setDisplayContent(id);
    }
  }, [matched, existInResult, selected, delay, order, id]);
  return (
    <div
      onClick={() => handleClick(id)}
      style={order ? { animationDelay: `${delay * order}ms` } : {}}
      className={`${selected && !matched && !existInResult
        ? `tile-style-selected`
        : selected && matched
          ? " matchedAnimation"
          : !selected && !matched && existInResult
            ? " unMatchedAnimation"
            : "tile-style"
        }
            transition-all ease-in-out duration-300 px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer transform hover:scale-110 select-none`}
    >
      {!matched && existInResult && !selected ? (
        <p>{displayContent}</p>
      ) : (
        <p>{id}</p>
      )}
    </div>
  );
};
