import React, { useEffect, useState } from 'react';
import coinPot from "./../../assets/image/coinpot.png";
import minusIcon from "./../../assets/icons/minus.svg";
import plusIcon from "./../../assets/icons/plus.svg";
import { useGlobalContext } from '../../context/context';
import { GameNumber } from '../../assets/data/local.db';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import UiButton from "../Ui/UiButton";
import UiModal from "../Ui/UiModal";
import ModalImg from "./../../assets/image/modalImg.png";
import reveledKenoSound from "./../../assets/game_sounds/Reveal_Number.mp3";
import winKenoSound from "./../../assets/game_sounds/win.mp3";
import useSound from "use-sound";
import axios from 'axios';
const GameCredit = ({ 
  setAuto, auto, gameNumbers, setGameNumbers, count, setCount, startAutoPlay,
  setStartAutoPlay,
  setProgress,
  resultModal,
  setResultModal,
  betAmount,
  setBetAmount,
  setWinnerCredit,
  winnerCredit,
  gameSelectedNumbers,
  setGameSelectedNumbers,}) => {
  const {
    betsNumber,
    setBetsNumber,
    betSize,
    selectedNumbers,
    setSelectedNumbers,
    authToken,
    setIsLoggedIn,
    setSelectedLength,
    selectedCurrency,
    setCurrencyBalance,
    setBetSize,
    setAuthToken,
    setSelectedBetData,
    selectedBetData,
  } = useGlobalContext();
  const [reveledPlay] = useSound(reveledKenoSound);
  const [winPlay] = useSound(winKenoSound);
  const [betLoading, setBetLoading] = useState(false);
  const [stopLoop, setStopLoop] = useState(false);
  const [singleBetLoading, setSingleBetLoading] = useState(false);
  // const [startAutoPlay, setStartAutoPlay] = useState(true);
  const navigate = useNavigate();

  const handleMinus = () => {
    setCount(pv => pv - 1);
    if (count <= 0) {
      setCount(0)
    }
  }
  const handlePlus = () => {
    setCount(pv => pv + 1);
    if (count >= 10) {
      setCount(10);
    }
  }
  const increaseBetNumbers = () => {
    setBetsNumber(betsNumber + 1);
  }
  const decreaseBetNumbers = () => {
    setBetsNumber(betsNumber - 1);
    if (betsNumber <= 0) {
      setBetsNumber(0);
    }
  }
  const selectRandomElements = () => {
    console.log("click..")
    if (selectedNumbers.length > 0) {
      setGameNumbers(GameNumber);
      setSelectedNumbers([]);
    }
    if (selectedNumbers.length <= 0) {
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
    if (betsNumber == 0) {
      setAuto(false)
    } else {
      setAuto(!auto)
    }


  }

  const handleBetNumberChange = (e) => {
    let value = e.target.value;
    if (!/^\d*$/.test(value)) {
      toast.error('Input field value contains only number!');
      setBetsNumber(0);
      return;
    }
    if (value > 1000) {
      value = 1000;
      setBetsNumber(value);
      toast.error("Max bets number 1000")
    } else {
      setBetsNumber(value);
    }
  }



  function generateRandomNumbersArray() {
    const numbersArray = [];
    while (numbersArray.length < 10) {
      const randomNumber = Math.floor(Math.random() * 40) + 1;
      if (!numbersArray.includes(randomNumber)) {
        numbersArray.push(randomNumber);
      }
    }
    return numbersArray;
  }




  const abortRef = React.useRef(false);


  const handleAutoPlay = () => {
    console.log('first')
    abortRef.current = true;
    setStartAutoPlay(true);
  }
  const handlePlay = async () => {
    console.log("first");
    setStartAutoPlay(false)
    console.log('first')
    // console.log("Selected Currencty", selectedCurrency,"+", betAmount);
    if (auto) {
      setStartAutoPlay(false)
      for (let i = 0; i < betsNumber; i++) {

        if (abortRef.current) {
          return;
        }

        try {
          const res = await axios.post(
            "https://apis.yummylabs.io/placeKenoBet",
            {
              SelectedField: gameNumbers
                .filter((item) => item.selected)
                .map((item) => item.id),
              BetAmount: selectedCurrency === "ETH"
                ? (betSize / 10) * 0.00002
                : (betSize / 10) * 0.1,
              CoinType: selectedCurrency,
              ClientSeed: "YH5TKhsykH9obK5UiXbGErFUnBcMClAle7BtG4va",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
              },
            }
          );
          setCurrencyBalance(res?.data?.data?.Balance);
          const winFields = res?.data?.data?.WinFields;
          let copiedGameNumbers = gameNumbers.map((number) => ({ ...number }));
          let order = 0;
          const numbersToRenderNext = copiedGameNumbers?.map((el) => {
            if (winFields.includes(el.id) && el.hasOwnProperty("selected")) {
              order += 1;
              return { ...el, matched: true, order };
            } else if (
              winFields.includes(el.id) &&
              !el.hasOwnProperty("selected")
            ) {
              order += 1;
              return { ...el, existInResult: true, order };
            } else {
              return el;
            }
          });
          if (res?.data?.code == -2) {
            setAuthToken("");
            setIsLoggedIn(false);
            setCurrencyBalance(null);
            setSelectedLength([]);
            setSelectedNumbers([]);
            localStorage.removeItem("cactus_club_token");
            localStorage.removeItem("cactus_club_currency_balance");
            navigate("/");
          }
          setGameNumbers(numbersToRenderNext);
          numbersToRenderNext
            .filter((el) => el.selected && el.matched)
            .map((el, i) => {
              setTimeout(
                () => setProgress((100 / 10) * (i + 1)),
                el.order * 400
              );
            });
          numbersToRenderNext
            .filter((el) => el.matched || el.existInResult)
            .map((el) => {
              console.log("going...");
              setTimeout(() => {
                reveledPlay();
              }, el.order * 400);
            });
          await new Promise((resolve) => setTimeout(resolve, 5000));
          if (res?.data?.data?.Profit > 0) {
            winPlay();
          }
          setBetLoading(false);
          setBetsNumber((pre) => pre - 1);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong!");
        } finally {
          setGameNumbers(gameSelectedNumbers)
          setProgress(0);
          if (betsNumber === 0 || stopLoop) {
            setAuto(false);
          }
        }
      }
    } else {
      setSingleBetLoading(true);
      try {
        const res = await axios.post(
          "https://apis.yummylabs.io/placeKenoBet",
          {
            SelectedField: gameNumbers
              .filter((item) => item.selected)
              .map((item) => item.id),
            BetAmount:
              selectedCurrency === "ETH"
                ? (betSize / 10) * 0.00002
                : (betSize / 10) * 0.1,
            CoinType: selectedCurrency,
            ClientSeed: "YH5TKhsykH9obK5UiXbGErFUnBcMClAle7BtG4va",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
          }
        );
        if (res?.data?.data?.Balance) {
          setCurrencyBalance(res?.data?.data?.Balance);
        }

        if (res?.data?.code == -2) {
          setIsLoggedIn(false);
          navigate("/");
          setSelectedLength([]);
          setSelectedNumbers([]);
          localStorage.clear();
        }
        setWinnerCredit(res?.data?.data?.Profit);
        const winFields = res?.data?.data?.WinFields;
        let copiedGameNumbers = gameNumbers.map((number) => ({ ...number }));
        let order = 0;
        const numbersToRenderNext = copiedGameNumbers?.map((el) => {
          if (winFields.includes(el.id) && el.hasOwnProperty("selected")) {
            order += 1;
            return { ...el, matched: true, order };
          } else if (
            winFields.includes(el.id) &&
            !el.hasOwnProperty("selected")
          ) {
            order += 1;
            return { ...el, existInResult: true, order };
          } else {
            return el;
          }
        });
        numbersToRenderNext
          .filter((el) => el.selected && el.matched)
          .map((el, i) => {
            setTimeout(() => {
              setProgress((100 / 10) * (i + 1));
            }, el.order * 400);
          });

        numbersToRenderNext
          .filter((el) => el.matched || el.existInResult)
          .map((el) => {
            setTimeout(() => {
              reveledPlay();
            }, el.order * 400);
          });

        setGameNumbers(numbersToRenderNext);
        const intervalId = setInterval(() => {
          setSingleBetLoading(false);
          if (res?.data?.data?.Profit > 0) {
            winPlay();
            setResultModal(true);
          }
          if (res?.data?.data?.Profit < 0) {

            setSelectedLength([])
          }
          setGameNumbers(gameSelectedNumbers)
          setProgress(0);

          clearInterval(intervalId);
        }, 5000);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong!");
      } finally {

      }
    }
  };

   // Reset Auto play off functionality

  //  useEffect(() => {
  //   if(startAutoPlay && auto  ){
  //     setAuto(false)
  //     setBetsNumber(pre => pre*0);
  //   }
  // },[startAutoPlay])

  const handleStopBets = () => {
    setStopLoop(true);
  };


  const handleClear = () => {
    setGameNumbers([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
      { id: 40 },
    ]);
    setSelectedLength([]);
    setSelectedNumbers([]);
    setProgress(0);
    setSelectedBetData({});
    setCount(0);
    setBetSize(10);
    setBetsNumber(0);
    setAuto(false);
  };
  const handleMin = () => {
    setBetSize(10);
  };

  const closeResultModal = () => {
    setGameNumbers([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
      { id: 40 },
    ]);
    setSelectedLength([]);
    setSelectedNumbers([]);
    setProgress(0);
    setSelectedBetData({});
    setResultModal(false);
  };

  const handleMax = () => {
    setBetSize(15500000);
  };
  const handleHalf = () => {
    if (betSize % 2 == 0 && betSize > 20) {
      setBetSize(betSize / 2);
    } else {
      setBetSize(betSize);
    }
  };
  const handle2x = () => {
    if (betSize >= 15500000) {
      setBetSize(15500000);
    } else {
      setBetSize(betSize * 2);
    }
  };
  const handleSelectError = () => {
    toast.error("Select Atleast 1 Number");
  };

  const handlePlayClick = () => {
    if (!singleBetLoading && (selectedNumbers.length > 0 || auto)) {
      handlePlay();
    } else if (!singleBetLoading) {
      handleSelectError();
    }
  };
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
        <div className='block w-full md:hidden'>
          <div>
            {auto ? (
              <div
                onClick={() => (startAutoPlay ? handlePlay() : handleAutoPlay())}
                className={`${selectedNumbers.length > 0 || auto || singleBetLoading
                  ? "cursor-pointer"
                  : " cursor-not-allowed "
                  }w-full md:w-[279px] h-[56px] md:h-[73px] bg-primary-game hover:bg-dark-green rounded-md text-white
            ${auto ? "!text-[24px]" : "w-full"}
            text-3xl md:text-4xl flex justify-center items-center select-none font-rubik uppercase active:scale-95 transition-all ease-in-out duration-300 transform hover:scale-105 `}
              >
                {startAutoPlay ? "start auto play" : "stop auto play"}
              </div>
            ) : (
              <div
                onClick={() => {
                  handlePlay();
                }}
                className={`${selectedNumbers.length > 0 || auto || singleBetLoading
                  ? "cursor-pointer"
                  : " cursor-not-allowed "
                  }w-full md:w-[279px] h-[56px] md:h-[73px] bg-primary-game hover:bg-dark-green rounded-md text-white
            ${auto ? "!text-[24px]" : "w-full"}
            text-3xl md:text-4xl flex justify-center items-center select-none font-rubik uppercase active:scale-95 transition-all ease-in-out duration-300 transform hover:scale-105 `}
              >
                {"play"}
              </div>
            )}
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
            <div onClick={selectRandomElements} className={`${count != 0 ? "hover:bg-green-hover cursor-pointer	" : "cursor-not-allowed	"}w-[23%] bg-dark-green md:w-[78px] h-[70px] flex justify-center items-center rounded-tr-md rounded-br-md shadow transition-all ease-in-out duration-300 transform hover:scale-105`}>
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
                <div className="flex ml-[4px] gap-2 bg-white bg-opacity-10 rounded-lg">
                  <div onClick={decreaseBetNumbers} className="bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-105">
                    <img src={minusIcon} alt="icon" />
                  </div>
                  <input onChange={handleBetNumberChange} onBlur={(e) => e.target.value == "" ? setBetsNumber(0) : betsNumber} className=" text-white text-base font-normal font-rubik bg-none border-none outline-none w-12 bg-white bg-opacity-0 text-center" type='text' value={betsNumber} />
                  {/* {betsNumber} */}
                  {/* </div> */}
                  <div onClick={increaseBetNumbers} className="bg-white flex justify-center items-center rounded-[100px] h-[22px] w-[22px] cursor-pointer ml-3 transition-all ease-in-out duration-300 transform hover:scale-105">
                    <img src={plusIcon} alt="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`w-[23%] md:w-[78px] h-[70px] ${auto ? "bg-[#955B38]" : "bg-dark-green"
                }  flex justify-center items-center rounded-tr-md rounded-br-md shadow button-transition hover:bg-green-hover transition-all ease-in-out duration-300 transform hover:scale-105`}
            >
              <button
                onClick={
                  () => {
                    setStartAutoPlay(true);
                    handleAutoBet();
                  }

                }
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