import React, { useEffect, useState } from "react";
import { GameNumber, betXData } from "../../assets/data/local.db";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CatusGame = ({ gameNumbers, setGameNumbers, progress, setProgress }) => {
  // const [selectedNumbers, setSelectedNumbers] = useState([]);
  // const [selectedLength, setSelectedLength] = useState([]);
  const [machedTiles, setMatchedTiles] = useState([]);
  const [betProgress, setBetProgress] = useState(0);
  const {
    isLoggedIn,
    selectedNumbers,
    setSelectedNumbers,
    selectedLength,
    setSelectedLength,
    matchingNumbers,
    unMatchNumbers,
    betWinFields,
    setBetWinFields,
    selectedBetData, 
    setSelectedBetData
  } = useGlobalContext();
  const navigate = useNavigate();

  console.log("Selected numbers", selectedNumbers);
  console.log("Selected Length", selectedLength);

  const [matchingElements, setMatchingElements] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [checkedElements, setCheckedElements] = useState([]);
  const [currentNewIndex, setCurrentNewIndex] = useState(0);


  // console.log(gameNumbers.filter((el) => el.selected).length)


  ///Game numbers

  const gameTiles = GameNumber.map((el) => el.id);
  useEffect(() => {
    const matchingWinner = gameTiles.filter((element) =>
      matchingNumbers.includes(element)
    );
    setMatchedTiles(matchingWinner);
  }, [matchingNumbers]);

  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < betWinFields?.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);


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
        toast.error("Max 10 numbers selected!");
        return;
      }

      if (selectedNumbers.includes(id)) {
        setSelectedNumbers(selectedNumbers.filter(num => num !== id));
        setSelectedLength([...selectedLength.slice(0, -1)])
      } else {
        if (selectedNumbers.length < 10) {
          const newSelectedNumbers = [...selectedNumbers, id];
          setSelectedNumbers(newSelectedNumbers);
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
      // } else {
      //   toast.error("Max 10 numbers selected!");
      // }
    }
  };

 

  useEffect(() => {
    const selectedData = betXData.find(
      (item) => item.id === selectedNumbers.length
    );
    setSelectedBetData(selectedData)
  }, [selectedNumbers])
  




  useEffect(() => {
    const targetProgress = ((machedTiles.length / selectedNumbers.length) * 100);

    if (machedTiles.length > 0 && selectedNumbers.length > 0) {
      let currentProgress = betProgress;
      const intervalId = setInterval(() => {
        const chunkProgress = ((targetProgress) / machedTiles.length);
        currentProgress += chunkProgress;
        console.log(currentProgress);
        setBetProgress(currentProgress);
        if (currentProgress >= targetProgress) {
          clearInterval(intervalId);
        }
      }, 500);

      return () => {
        clearInterval(intervalId);
        setBetProgress(0);
        // setSelectedNumbers([])
        setMatchedTiles([]);
      };
    }
  }, [machedTiles, selectedNumbers]);


  console.log("selectend numbers>>\n", selectedNumbers);



  // const [tileClassName, setTileClassName] = useState()
  //   useEffect(() => {
  //     const num = betWinFields[currentIndex];
  //     const newClassName = getClassName(num);
  //     setTileClassName(newClassName);
  //   }, [currentIndex, betWinFields]);

  const getClassName = (num) => {
    if (gameTiles.includes(num) && machedTiles.includes(num)) {
      return ` winner-tile flipped px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none`;
    }
    if (selectedNumbers.includes(num) && unMatchNumbers.includes(num)) {
      return "tile-style-selected px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none";
    }
    if (gameTiles.includes(num) && betWinFields.includes(num)) {
      return `tile-bet-unmatched flipped px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-red-400 text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none`;
    }
    if (gameTiles.includes(num) || machedTiles.includes(num)) {
      return "tile-style px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none";
    }
  };



  useEffect(() => {
    const interval = setInterval(() => {
      if (currentNewIndex < betWinFields?.length) {
        setCheckedElements((prevCheckedElements) => [
          ...prevCheckedElements,
          betWinFields[currentNewIndex],
        ]);
        setCurrentNewIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [betWinFields, currentNewIndex]);

  useEffect(() => {
    if (selectedNumbers.length > 11) {
      toast.error("Max 10 numbers selected!");
    }
  }, [selectedNumbers]);
  return (
    <div>
      <div>
        {/* {matchingNumbers.length > 0 ? (
          <div className="grid grid-cols-8 lg:grid-cols-10 gap-2 p-3 lg:p-6">
            {Array.from(new Set(gameTiles.concat(machedTiles))).map(
              (num, index) => (
                <div key={index}>
                  <div
                    // onClick={() => handleClick(id)}
                    className={getClassName(num)}
                    key={index}
                  >
                    {gameTiles.includes(num) &&
                    betWinFields.includes(num) &&
                    !machedTiles.includes(num)
                      ? "X"
                      : num}
                  </div>
                </div>
              )
            )}
          </div>
        ) : ( */}
        <div className="grid grid-cols-8 lg:grid-cols-10 gap-2 p-3 lg:p-6">
          {console.log("Game_numbers:", gameNumbers)}
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

        </div>
        {/* )} */}
        {/* {GameNumber.map(({ id }) => (
          <div
            onClick={() => handleClick(id)}
            className={`${selectedNumbers.includes(id)
              ? `tile-style-selected`
              : "tile-style"
              } px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none`}
            key={id}
          >
            {id}
          </div>
        ))} */}
      </div>
      <div>
        <div className="relative h-16">
          <div
            className={`absolute rounded-r-3xl ${progress > 0 ? "bg-primary-game" : "bg-white"
              } h-10 `}
            // className={`absolute rounded-r-3xl bg-primary-game h-10 w-full`}
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={`absolute w-full ${progress > 0 ? "text-[#955B38]" : "text-primary-game"
              } text-xs md:text-sm font-normal font-rubik uppercase text-center`}
          // className={`absolute text-primary-game w-full text-xs md:text-sm font-normal font-rubik uppercase text-center`}
          >
            {/* <div className='flex justify-around'> */}

            {selectedNumbers.length > 0 ? (
              <div>
                <div>
                  {/* {
                betXData.map(el => el.id) == selectedLength ? betXData.map(el => <li>{el.bet}</li>): " "
              } */}

                  <div className="flex justify-around w-full">
                    {selectedBetData?.bet.map((value, index) => (
                      <div className="flex">
                        <li className={`list-none flex-1 ${selectedBetData.bet.length === 7 && "mr-[-10px]"} ${selectedBetData.bet.length === 11 && "ml-[10px]"}`}
                          key={index}>
                          <h6>{value}</h6>
                          <h6>{index}</h6>
                        </li>
                      </div>
                    ))}
                  </div>
                  {/* {betXData.map(bet => <li>{(bet.bet.map(el => el))}</li>)} */}
                </div>
              </div>
            ) : (
              "Select between 1 and 10 numbers to play!"
            )}
            {/* </div> */}
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

      // Clear the timeout when component unmounts or when delay or order changes
      return () => clearTimeout(timeout);
    } else {
      // Reset display content to id if conditions are not met
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
            transition-all ease-in-out duration-75       px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none`}
    >
      {/* {!matched && existInResult && !selected ? <p style={order ? { animationDelay: `${delay * order}ms` } : {}}>X</p> : id} */}
      {/* <p  style={order ? { animationDelay: `${delay * order}ms` } : {}}>{!matched && existInResult && !selected ?"X" : id}</p> */}

      {/* Display the dynamic content */}
      {!matched && existInResult && !selected ? (
        <p>{displayContent}</p>
      ) : (
        <p>{id}</p>
      )}
    </div>
  );
};
