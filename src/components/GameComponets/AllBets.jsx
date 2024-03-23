import React, { useEffect, useState } from 'react';
import { formattedTimeOnly } from "./../../utilities/utilitiesFunction";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import UiModal from '../Ui/UiModal';
import BetDetailsModal from './BetDetailsModal';
import UiButton from '../Ui/UiButton';
// const apiUrl = 'ws://apis.yummylabs.io/ws/getAllBetHistory';
const AllBets = () => {
  const [allBetsData, setAllBetsData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [selectedHistoryVerfiy, setSelectedHistoryVerify] = useState(null);
  const [playerbet, setPlayerBet] = useState();
  const [loading, setLoading] = useState(false);



  const {
    setAuthToken,
    setCurrencyBalance,
    setIsLoggedIn,
    authToken, isLoggedIn, 
  } = useGlobalContext()
  const navigate = useNavigate();

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

  const closeModal = () => {
    setModalOpen(false);
  };



  const handleSelectBet = async (data) => {
    try {
      const res = await axios.get(`https://apis.yummylabs.io/getKenoBetHistoryInfo?BetID=${data.BetID}`)
      if (res?.data?.data?.records) {
        setSelectedBet(res?.data?.data?.records);
      }
    } catch (error) {
      console.log(error);
    }
    // Verify Data 
    try {
      const response = await axios.get(`https://apis.yummylabs.io/getKenoBetHistoryVerify?BetID=${data.BetID}`, {
        headers: {
          Authorization: authToken,
        }
      })
      console.log("res>>\n", response);
      if (response?.data) {
        setSelectedHistoryVerify(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
    setModalOpen(true);
  };



  useEffect(() => {
    fetchInitialData();

    const ws = new WebSocket("wss://apis.yummylabs.io/ws/getAllBetHistory");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAllBetsData(prevData => {
        const newData = [data, ...prevData.slice(0, 19)];
        return newData.slice(0, 20);
      });
    };

    // Cleanup WebSocket connection
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-[#128880] py-4 font-rubik  text-center "
                      >
                        BetID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Coin
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Bet
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Payout
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBetsData?.slice(0, 19).map((data, index) => (
                      <tr key={data.BetID} className="">
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                            ? "bg-white bg-opacity-50"
                            : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-[6px] md:pl-0 cursor-pointer hover:underline`}
                            onClick={() => handleSelectBet(data)}
                        >
                          {data.BetID}
                        </td>
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                            ? "bg-white bg-opacity-50"
                            : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                        >
                          {formattedTimeOnly(data.Time)}
                        </td>
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                            ? "bg-white bg-opacity-50"
                            : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                        >
                          {data.User}
                        </td>
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                            ? "bg-white bg-opacity-50"
                            : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                        >
                          {data.Coin}
                        </td>
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                            ? "bg-white bg-opacity-50"
                            : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                        >
                          {data.Bet}
                        </td>
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                            ? "bg-white bg-opacity-50"
                            : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                        >
                          {data.Payout}
                        </td>
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                            ? "bg-white bg-opacity-50"
                            : "bg-none"
                            } ${data.Profit < 0 ? "text-[#C21C00]" : "text-[#128880]"} font-semibold font-poppins py-2 text-center pl-2 pr-[6px] md:pr-0`}
                        >
                          {data.Profit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        <UiModal isOpen={isModalOpen} onClose={closeModal} close={true}>
          <div>
            {<BetDetailsModal data={selectedBet} historyVerify={selectedHistoryVerfiy} />}
            {/* {<VerifyData data={selectedHistoryVerfiy}/>} */}
          </div>
          <div className="flex items-center justify-center mt-[45px]">
            <div onClick={closeModal}>
              <UiButton label={"OK"}  classes='w-full px-16'/>
            </div>
          </div>
        </UiModal>
      }
    </div>
  );
};
export default AllBets;