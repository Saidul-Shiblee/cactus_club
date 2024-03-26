import React, { useEffect, useState } from 'react';
import AllBets from './AllBets';
import MyBets from './MyBets';
import { useGlobalContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BetHistory = () => {
  const [betHistory, setBetHostory] = useState("allbets");
  const navigate = useNavigate();
  const {setAllBetsData, setPlayerBet, setIsLoggedIn} = useGlobalContext()

  const fetchInitialData = async () => {
    try {
      const response = await axios.get("https://apis.yummylabs.io/getAllBetHistory");
      if(response?.data?.code == -2){
        setIsLoggedIn(false);
        navigate("/");
        localStorage.clear();
      }
      setAllBetsData(response.data.data.records)
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
  useEffect(() => {
    fetchInitialData();

    const ws = new WebSocket("wss://apis.yummylabs.io/ws/getAllBetHistory");
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const getUsername = localStorage.getItem("cactus_club_username");
      if(data.User === getUsername){
        setPlayerBet(preValue => {
          const newData = [data, ...preValue?.slice(0, 19)];
          return newData.slice(0, 20);
        })
      }
      setAllBetsData(prevData => {
        const newData = [data, ...prevData.slice(0, 19)];
        return newData.slice(0, 20);
      });
    };

    return () => {
      ws.close();
    };
  }, []);
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