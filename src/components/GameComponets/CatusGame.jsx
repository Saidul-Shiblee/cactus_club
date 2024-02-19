import React, { useEffect, useState } from "react";
import { GameNumber, betXData } from "../../assets/data/local.db";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const CatusGame = ({ gameNumbers, setGameNumbers, progress }) => {
  const {
    isLoggedIn,
    selectedNumbers,
    setSelectedNumbers,
    selectedLength,
    setSelectedLength,
    selectedBetData,
    setSelectedBetData
  } = useGlobalContext();
  const navigate = useNavigate();
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
    }
  };
  useEffect(() => {
    const selectedData = betXData.find(
      (item) => item.id === selectedNumbers.length
    );
    setSelectedBetData(selectedData)
  }, [selectedNumbers])
  return (
    <div>
      <div>
        <div className="grid grid-cols-8 lg:grid-cols-10 gap-2 p-3 lg:p-6">
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
      </div>
      <div>
        <div className="relative h-16 px-[24px]">
          <div
            className={`w-full relative z-30 ${
              progress > 0 ? "text-[#955B38]" : "text-primary-game"
            } text-xs md:text-sm font-normal font-rubik uppercase text-center`}
          >
            {selectedNumbers.length > 0 ? (
              <div className="flex justify-between items-center gap-[1px] w-full ">
                {selectedBetData?.bet.map((value, index) => {
                 const orginalProgress = progress ?progress+10:0
                  return (
                    <div
                      style={{
                        width: `${100 / (selectedNumbers.length + 1)}%`,
                      }}
                      className={`flex  flex-col py-1  rounded-r-xl ${
                        index + 1 <= orginalProgress / 10
                          ? "bg-primary-game"
                          : "bg-white"
                      }`}
                      key={index}
                    >
                      <h6>{value}</h6>
                      <h6>{index}</h6>
                    </div>
                  );
                })}
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
            transition-all ease-in-out duration-75       px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none`}
    >
      {!matched && existInResult && !selected ? (
        <p>{displayContent}</p>
      ) : (
        <p>{id}</p>
      )}
    </div>
  );
};
