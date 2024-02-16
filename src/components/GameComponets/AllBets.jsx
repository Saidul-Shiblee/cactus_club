import React, { useEffect, useState } from 'react';
import { BetHistoryData } from '../../assets/data/local.db';
import io from 'socket.io-client';
import { URL } from '../../ApiFetcher/fetcher';
import { data } from 'autoprefixer';
import {formattedTimeOnly} from "./../../utilities/utilitiesFunction";


// const apiUrl = 'ws://apis.yummylabs.io/ws/getAllBetHistory';

const AllBets = () => {
  const [allBetsData, setAllBetsData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://apis.yummylabs.io/ws/getAllBetHistory");
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("real time", data.BetID);
  
      setAllBetsData(prevData => {
        const newData = [data, ...prevData.slice(0, 19)];
  
        return newData.slice(0, 20);
      });
    };
  
    return () => {
      ws.onclose = (event) => {
        console.log(event);
      };
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
                    {allBetsData?.map((data, index) => (
                      <tr key={data.BetID} className="">
                        <td
                          className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-[6px] md:pl-0`}
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
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 pr-[6px] md:pr-0`}
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
    </div>
  );
};

export default AllBets;