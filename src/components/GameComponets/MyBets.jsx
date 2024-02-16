import React, { useEffect, useState } from 'react';
import { BetHistoryData } from '../../assets/data/local.db';
import axios from 'axios';
import { useGlobalContext } from '../../context/context';
import { formattedTimeOnly } from '../../utilities/utilitiesFunction';


const MyBets = () => {
  const {authToken} = useGlobalContext();
const [playerbet, setPlayerBet] = useState();
const [loading, setLoading] = useState(false);

const playerBetHistory = async() => {
  setLoading(true)
try {
  const res = await axios.get("https://apis.yummylabs.io/getPlayerBetHistory", {
    headers: {
      Authorization: authToken
    }
  })

  // console.log(res?.data?.data?.records);
  setPlayerBet(res?.data?.data?.records)
  
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}
}

useEffect(() => {
playerBetHistory();
},[])


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
                          className="text-sm font-medium text-[#128880] py-4 font-rubik text-center"
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
                    {
                      !loading ? 
                      <tbody>
                      {playerbet?.slice(0, 19).map((data, index) => (
                        <tr key={data.BetID} className="">
                          {/* {console.log(data)} */}
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-[6px] md:pl-0`}
                          >
                            {data.BetID}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {formattedTimeOnly(data.Time)}
                            
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.User}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.Coin}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.Bet}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.Payout}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 pr-[6px] md:pr-0`}
                          >
                            {data.Profit}
                          </td>
                        </tr>
                      ))}
                    </tbody> : <p className=' text-primary-title font-semibold flex justify-center items-center mx-auto'>Loading.....</p>
                    }
                    
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MyBets;