import React, { useEffect, useState } from 'react';
import { GameNumber, betXData } from '../../assets/data/local.db';
import { useGlobalContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CatusGame = ({gameNumbers, setGameNumbers}) => {
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
    setBetWinFields
  } = useGlobalContext();
  const navigate = useNavigate()
  
  const [matchingElements, setMatchingElements] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [checkedElements, setCheckedElements] = useState([]);
  const [currentNewIndex, setCurrentNewIndex] = useState(0);

  ///Game numbers


  console.log("matching Elements", matchingElements);

  const gameTiles = GameNumber.map(el => el.id);
  useEffect(() => {
    const matchingWinner = gameTiles.filter(element => matchingNumbers.includes(element));
    setMatchedTiles(matchingWinner);
  }, [matchingNumbers]);
 
  console.log("selected unmatch", unMatchNumbers);




  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
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

  console.log("currentIndex", currentIndex);


  const handleClick = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (selectedNumbers.includes(id)) {
        setSelectedNumbers(selectedNumbers.filter(num => num !== id));
        setSelectedLength([...selectedLength.slice(0, -1)])
      } else {
        if (selectedNumbers.length < 10) {
          const newSelectedNumbers = [...selectedNumbers, id];
          setSelectedNumbers(newSelectedNumbers);
          setSelectedLength([...selectedLength, newSelectedNumbers.length]);
        } else {
          toast.error("Max 10 numbers selected!")
        }
      }
    }
  };

  const selectedData = betXData.find(item => item.id === selectedNumbers.length);

  console.log("matched tiles", machedTiles);

// const [tileClassName, setTileClassName] = useState()
//   useEffect(() => {
//     const num = betWinFields[currentIndex];
//     const newClassName = getClassName(num);
//     setTileClassName(newClassName);
//   }, [currentIndex, betWinFields]);


  const getClassName = (num) => {
    if (gameTiles.includes(num) && machedTiles.includes(num)) {
      return` winner-tile flipped px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none`;
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


  // const [checkedElements, setCheckedElements] = useState([]);
  // const [currentNewIndex, setCurrentNewIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentNewIndex < betWinFields?.length) {
        setCheckedElements(prevCheckedElements => [
          ...prevCheckedElements,
          betWinFields[currentNewIndex]
        ]);
        setCurrentNewIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [betWinFields, currentNewIndex]);

  console.log("checked elements", checkedElements);

  // useEffect(() => {
  //   getClassName()
  // }, [currentIndex])

  // if(machedTiles.length>0){
  //   const progress = ((machedTiles?.length / selectedNumbers?.length) * 100) + 5;
  //   console.log("progress", progress);
  //   setBetProgress(progress);
  // }
  // const progress = ((machedTiles.length / selectedNumbers.length) * 100);

  // // useEffect(() => {
  //   if (machedTiles.length > 0 && selectedNumbers.length > 0) {
  //   for (let i = 0; i < machedTiles.length; i++) {
  //     setInterval(() => {
  //       const chunkProgress = (progress / machedTiles.length) + 5;
  //       console.log(chunkProgress)
  //       setBetProgress(chunkProgress);
  //     }, 2000)
  //    return clearInterval()
  //   }
      

  //   }
  // }, [machedTiles, selectedNumbers, progress]);




//   useEffect(() => {
//     const targetProgress = ((machedTiles.length / selectedNumbers.length) * 100) + 5;

//     if (machedTiles.length > 0 && selectedNumbers.length > 0) {
//         let currentProgress = betProgress;
//         const intervalId = setInterval(() => {
//             const chunkProgress = ((targetProgress) / machedTiles.length) ;
//             currentProgress += chunkProgress;
//             console.log(currentProgress);
//             setBetProgress(currentProgress);
//             if (currentProgress >= targetProgress) {
//                 clearInterval(intervalId); 
//             }
//         }, 1000);

//         return () => clearInterval(intervalId);
//     }
// }, [machedTiles, selectedNumbers]);


// useEffect(() => {
//   const winFields = [...betWinFields];

//   function pushOneByOne() {
//     if (winFields.length > 0) {
//       const element = winFields.shift();
//       setBetWinFields([element]);
//     }
//   }

//   function pushTenElements() {
//     const elements = [];
//     for (let i = 0; i < 10; i++) {
//       if (winFields.length > 0) {
//         elements.push(winFields.shift());
//       } else {
//         break;
//       }
//     }
//     setBetWinFields(elements);
//   }

//   const intervaalId = setInterval(pushOneByOne, 500);

//   setTimeout(() => {
//     clearInterval(intervaalId);
//     setInterval(pushTenElements, 500);
//   }, 5000);
// },[])





// useEffect(() => {
//   const targetProgress = ((machedTiles.length / selectedNumbers.length) * 100);
//   let updatesCount = 0;

//   if (machedTiles.length > 0 && selectedNumbers.length > 0) {
//       const intervalId = setInterval(() => {
//           if (updatesCount < machedTiles.length) {
//               const chunkProgress = (targetProgress / machedTiles.length) + 5;
//               setBetProgress(prevProgress => prevProgress + chunkProgress);
//               updatesCount++;
//           } else {
//               clearInterval(intervalId); // Clear the interval after updating `matchedTiles.length` times
//           }
//       }, 2000);

//       // Clear the interval when the component unmounts or when matchedTiles or selectedNumbers change
//       return () => clearInterval(intervalId);
//   }
// }, [machedTiles, selectedNumbers]);

  


  useEffect(() => {
    if(selectedNumbers.length > 11){
      toast.error("Max 10 numbers selected!")
    }
  }, [selectedNumbers]);
  return (
    <div>
      <div>
        {
          matchingNumbers.length > 0?
            <div className="grid grid-cols-8 lg:grid-cols-10 gap-2 p-3 lg:p-6">
              {
                Array.from(new Set(gameTiles.concat(machedTiles))).map((num, index) =>
                  <div key={index}>
                    <div
                      // onClick={() => handleClick(id)}
                      className={getClassName(num)}
                      key={index}
                    >
                      {gameTiles.includes(num) && betWinFields.includes(num) && !machedTiles.includes(num) ? "X" : num}
                    </div>
                  </div>
                )
              }

            </div>

            :
            <div className="grid grid-cols-8 lg:grid-cols-10 gap-2 p-3 lg:p-6">
              {gameNumbers.map(({ id }) => (
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
              ))}
            </div>

        }
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
        <div className='relative h-16'>
          <div className={`absolute rounded-r-3xl ${betProgress > 0 ? "bg-primary-game": "bg-white"} h-10 `} style={{ width: `${betProgress}%` }}>
          </div>
            <div className={`absolute w-full ${betProgress > 0 ? "text-[#955B38]": "text-primary-game"} text-xs md:text-sm font-normal font-rubik uppercase text-center`}>
              {/* <div className='flex justify-around'> */}

              {selectedNumbers.length > 0 ?
                <div>
                  <div>
                    {/* {
                betXData.map(el => el.id) == selectedLength ? betXData.map(el => <li>{el.bet}</li>): " "
              } */}

                    <div className='flex justify-around w-full'>
                      {selectedData.bet.map((value, index) => (
                        <li className='list-none' key={index}>{value}</li>
                      ))}
                    </div>
                    {/* {betXData.map(bet => <li>{(bet.bet.map(el => el))}</li>)} */}
                  </div>
                  <div className='flex justify-around w-full'>
                    <p className='flex justify-center items-center'>0</p>
                    {selectedLength?.map(el => <li className='list-none flex justify-center items-center' key={el}>{el}</li>)}
                  </div>
                </div>
                :
                "Select between 1 and 10 numbers to play!"}
              {/* </div> */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatusGame;







