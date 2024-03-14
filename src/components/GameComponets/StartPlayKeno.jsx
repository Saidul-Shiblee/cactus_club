import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import UiButton from "../Ui/UiButton";
import UiModal from "../Ui/UiModal";
import ModalImg from "./../../assets/image/modalImg.png";
import { GameNumber } from "../../assets/data/local.db";
import reveledKenoSound from "./../../assets/game_sounds/Reveal_Number.mp3";
import winKenoSound from "./../../assets/game_sounds/win.mp3";
import useSound from "use-sound";

const StartPlayKeno = ({
  auto,
  setAuto,
  gameNumbers,
  setGameNumbers,
  setProgress,
  count,
  setCount,
  resultModal,
  setResultModal,
  betAmount,
  setBetAmount,
  setWinnerCredit,
  winnerCredit,
  gameSelectedNumbers,
  setGameSelectedNumbers,
}) => {

  const navigate = useNavigate();
  const {
    authToken,
    setIsLoggedIn,
    selectedNumbers,
    setSelectedNumbers,
    setSelectedLength,
    betsNumber,
    setBetsNumber,
    selectedCurrency,
    setCurrencyBalance,
    betSize,
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
  const [startAutoPlay, setStartAutoPlay] = useState(true);



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

  const handleStopBets = () => {
    setStopLoop(true);
  };

  const handlePlus = () => {
    setBetSize(betSize + 10);
  };

  const handleMinus = () => {
    setBetSize(betSize - 10);
    if (betSize <= 10) {
      setBetSize(10);
    }
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
  );
};

export default StartPlayKeno;