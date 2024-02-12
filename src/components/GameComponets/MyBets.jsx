import React from 'react';
import { BetHistoryData } from '../../assets/data/local.db';


const MyBets = () => {
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
                    <tbody>
                      {BetHistoryData.map((data, index) => (
                        <tr key={data.id} className="">
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-[6px] md:pl-0`}
                          >
                            {data.betId}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.time}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.user}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.coin}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.bet}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.payout}
                          </td>
                          <td
                            className={`text-[11px] ${
                              (index + 1) % 2 != 0
                                ? "bg-white bg-opacity-50"
                                : "bg-none"
                            } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 pr-[6px] md:pr-0`}
                          >
                            {data.profit}
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

export default MyBets;