import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/context";
import UiModal from "../Ui/UiModal";
import ModalImg from "./../../assets/image/modalImg.png";
import UiButton from "../Ui/UiButton";

const PlayKeno = ({ auto, gameNumbers, setGameNumbers }) => {
  // const {authToken} = useGlobalContext();
  // const [matchingNumbers, setMatchingNumbers] = useState([]);
  // const [unMatchNumbers, setUnMatchNumbers] = useState([]);
  const {
    authToken,
    isLoggedIn,
    selectedNumbers,
    setSelectedNumbers,
    selectedLength,
    setSelectedLength,
    betsNumber,
    setBetsNumber,
    selectedCurrency,
    currencyBalance,
    setCurrencyBalance,
    matchingNumbers,
    setMatchingNumbers,
    unMatchNumbers,
    setUnMatchNumbers,
    betWinFields,
    setBetWinFields,
    betSize,
    setBetSize
  } = useGlobalContext();
  const [resultModal, setResultModal] = useState(false);
  const [winnerCredit, setWinnerCredit] = useState(0);

  console.log(betWinFields, "bet Wind Fiedls");

  // const compareBets = () => {
  //   const matchingBets = array1.filter(element => array2.includes(element));
  //   const firstUnMatchBets = array1.filter(element => !array2.includes(element));
  //   const secondUnMatchBets = array2.filter(element => !array1.includes(element));
  //   setMatchingNumbers(matchingBets);
  //   setUnMatchNumbers([...firstUnMatchBets, ...secondUnMatchBets]);
  // };

  //     console.log("selected Num", selectedNumbers);

  // console.log("matching",matchingNumbers);
  // console.log("win Fields",betWinFields);
  // console.log("unmatching",unMatchNumbers);

  // const modalTimeInterval = () =>{
  //   setInterval(() => {
  //     console.log("calling");
  //     setResultModal(true)
  //   }, 5000);
  // }

  // const handleReset = () => {
  //   setUnMatchNumbers([]);

  // }



  const handlePlay = async () => {

    console.log(
      gameNumbers.filter((item) => item.selected).map((item) => item.id)
    );

    if (auto) {
      for (let i = 0; i < betsNumber; i++) {
      
        try {
          const res = await axios.post(
            "https://apis.yummylabs.io/placeKenoBet",
            {
              SelectedField: gameNumbers
                .filter((item) => item.selected)
                .map((item) => item.id),
              BetAmount: betSize,
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
          // setWinnerCredit()
          console.log(currencyBalance);
          const winFields = res?.data?.data?.WinFields;

          let copiedGameNumbers = gameNumbers.map((number) => ({ ...number }));

          let order = 0;
          const numbersToRenderNext = copiedGameNumbers.map((el) => {
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
          setGameNumbers(numbersToRenderNext);

          const compareBets = () => {
            const matchingBets = selectedNumbers.filter((element) =>
              winFields.includes(element)
            );
            const firstUnMatchBets = selectedNumbers.filter(
              (element) => !matchingBets.includes(element)
            );
            const secondUnMatchBets = matchingBets.filter(
              (element) => !selectedNumbers.includes(element)
            );
            setMatchingNumbers(matchingBets);
            setUnMatchNumbers([...firstUnMatchBets, ...secondUnMatchBets]);
          };

          compareBets();

          await new Promise(resolve => setTimeout(resolve, 5000));

        } catch (error) {
          console.log(error);
        } finally {
          // setMatchingNumbers([]);
          // setUnMatchNumbers([]);
          setGameNumbers([
            { id: 1, },
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
          ])

          // clearInterval(modalTimeInterval());
        }
      }
    } else {


      try {
        const res = await axios.post(
          "https://apis.yummylabs.io/placeKenoBet",
          {
            SelectedField: gameNumbers
              .filter((item) => item.selected)
              .map((item) => item.id),
            BetAmount: betSize,
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
        console.log(res?.data?.data);
        setWinnerCredit(res?.data?.data?.Profit)
        const winFields = res?.data?.data?.WinFields;

        let copiedGameNumbers = gameNumbers.map((number) => ({ ...number }));

        let order = 0;
        const numbersToRenderNext = copiedGameNumbers.map((el) => {
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
        setGameNumbers(numbersToRenderNext);

        // setBetWinFields(winFields);

        // const winFields = [...winFielddata];

        // function pushOneByOne() {
        //   if (winFields.length > 0) {
        //     const element = winFields.shift();
        //     setBetWinFields([element]);
        //   }
        // }

        // function pushTenElements() {
        //   const elements = [];
        //   for (let i = 0; i < 10; i++) {
        //     if (winFields.length > 0) {
        //       elements.push(winFields.shift());
        //     } else {
        //       break;
        //     }
        //   }
        //   setBetWinFields(elements);
        // }
        // const intervaalId = setInterval(pushOneByOne, 500);

        // setTimeout(() => {
        //   clearInterval(intervaalId);
        //   setInterval(pushTenElements, 500);
        // }, 5000);

        const compareBets = () => {
          const matchingBets = selectedNumbers.filter((element) =>
            winFields.includes(element)
          );
          const firstUnMatchBets = selectedNumbers.filter(
            (element) => !matchingBets.includes(element)
          );
          const secondUnMatchBets = matchingBets.filter(
            (element) => !selectedNumbers.includes(element)
          );
          setMatchingNumbers(matchingBets);
          setUnMatchNumbers([...firstUnMatchBets, ...secondUnMatchBets]);
        };

        compareBets();

        // modalTimeInterval()
        // setResultModal(true)

        const intervalId = setInterval(() => {
          console.log("calling");
          setResultModal(true);
          clearInterval(intervalId);
        }, 5000);

        // clearInterval(modalInterval)
      } catch (error) {
        console.log(error);
      } finally {
        // setMatchingNumbers([]);
        // setUnMatchNumbers([]);
        // clearInterval(modalTimeInterval());
      }

    }


  };


  const handlePlus = () => {
    setBetSize(betSize + 1);
  }

  const handleMinus = () => {
    setBetSize(betSize - 1);
    if (betSize <= 10) {
      setBetSize(10);
    }

  }

  const handleClear = () => {
    setBetSize(10);
  }


  const closeResultModal = () => {
    setGameNumbers([
      { id: 1, },
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

    setResultModal(false);
  };

  const handleMax = () => {
    setBetSize(15500000)
  }

  const handleHalf = () => {
    if (betSize % 2 == 0 && betSize > 20) {
      setBetSize(betSize / 2)
    } else {
      setBetSize(betSize);
    }
  }

  const handle2x = () => {

    if (betSize == 15500000) {
      setBetSize(15500000)
    } else {
      setBetSize(betSize * 2)
    }
  }
  return (
    <div className="p-2 md:p-6 w-full">
      <div className="flex flex-wrap gap-3 w-full">
        <div className=" flex gap-[3px] md:gap-[10px] w-full md:w-[491px]">
          <div className="grid gap-[3px] md:gap-[10px] w-1/3">
            <div className="flex gap-[3px] md:gap-[10px]">
              <div onClick={handleMinus} className="w-[50px] h-[25px] md:w-[73px] md:h-8 bg-dark-green flex justify-center items-center text-white rounded-md font-rubik cursor-pointer">
                -
              </div>
              <div onClick={handlePlus} className="w-[50px] h-[25px] md:w-[73px] md:h-8 bg-dark-green flex justify-center items-center text-white rounded-md font-rubik cursor-pointer">
                +
              </div>
            </div>
            <div onClick={handleClear} className="w-[103.19px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik cursor-pointer">
              clear
            </div>
          </div>
          <div className="grid gap-[3px] md:gap-[10px] w-1/3">
            <div onClick={handleClear} className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-center cursor-pointer">
              min
            </div>
            <div onClick={handleHalf} className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-center cursor-pointer">
              1/2
            </div>
          </div>
          <div className="grid gap-[3px] md:gap-[10px] w-1/3  ">
            <div onClick={handleMax} className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-end cursor-pointer">
              max
            </div>
            <div onClick={handle2x} className="w-[106.83px] h-[24.77px] md:w-[157px] md:h-8 bg-dark-green flex text-center justify-center items-center rounded-md text-white uppercase text-sm font-rubik place-self-end cursor-pointer">
              2x
            </div>
          </div>
        </div>
        <div
          onClick={handlePlay}
          className={`w-full md:w-[279px] h-[56px] md:h-[73px] bg-primary-game hover:bg-dark-green rounded-md text-white 
            ${auto ? "!text-[24px]" : ""}
            text-3xl md:text-4xl flex justify-center items-center cursor-pointer select-none font-rubik uppercase `}
        >
          {auto ? "start auto play" : "play"}
        </div>
      </div>
      <div>
        {/* Modal  */}
        {resultModal && (
          <UiModal isOpen={resultModal} onClose={closeResultModal}>
            <div className="px-[118px] justify-center text-center">
              <img src={ModalImg} className="mx-auto" alt="Modal image" />
              <h1 className="text-2xl font-rubik text-primary-title mt-[28px] uppercase">
                {winnerCredit > 0 ? "Your Won Credits" : "Your Lose Credits"}
              </h1>
              <p className="text-stone-950 text-opacity-50">
                {winnerCredit}-{selectedCurrency}
              </p>
              <UiButton
                label="OK"
                onClose={closeResultModal}
                classes="!w-full h-16 mt-[30px] mb-[56px]"
              />
            </div>
          </UiModal>
        )}
      </div>
    </div>
  );
};

export default PlayKeno;
