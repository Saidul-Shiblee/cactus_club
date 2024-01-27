import React, { useState } from 'react';
import AllBets from './AllBets';
import MyBets from './MyBets';

const BetHistory = () => {
  // const [allBets, setAllBets] = useState(false);
  // const [myBets, setMyBets] = useState(false);
  const [betHistory, setBetHostory] = useState("allbets");
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        <h6 className="text-teal-700 text-[22px] font-rubik uppercase">
          Bet History
        </h6>

        <div className='flex justify-center items-center gap-2'>
          <div
            onClick={() => setBetHostory("allbets")}
            className={`w-[102.17px] h-9 ${
              betHistory === "allbets"
                ? "bg-primary-game text-white"
                : "bg-white text-primary-game"
            }  text-xs rounded-md flex justify-center items-center font-rubik cursor-pointer uppercase`}
          >
            all bets
          </div>
          <div
            onClick={() => setBetHostory("mybets")}
            className={`w-[102.17px] h-9 ${
              betHistory === "mybets"
                ? "bg-primary-game text-white"
                : "bg-white text-primary-game"
            }  text-xs rounded-md flex justify-center items-center font-rubik cursor-pointer uppercase`}
          >
            my bets
          </div>
        </div>
      </div>
      {betHistory === "allbets" && <AllBets />}
      {betHistory === "mybets" && <MyBets />}
    </div>
  );
};

export default BetHistory;