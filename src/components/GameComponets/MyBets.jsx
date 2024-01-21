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
                                            <th scope="col" className="text-sm font-medium text-dark-green py-4 font-rubik text-left">
                                                BetID
                                            </th>
                                            <th scope="col" className="text-sm font-rubik font-medium text-dark-green py-4 text-left">
                                                Time
                                            </th>
                                            <th scope="col" className="text-sm font-rubik font-medium text-dark-green py-4 text-left">
                                                User
                                            </th>
                                            <th scope="col" className="text-sm font-rubik font-medium text-dark-green py-4 text-left">
                                                Coin
                                            </th>
                                            <th scope="col" className="text-sm font-rubik font-medium text-dark-green py-4 text-left">
                                                Bet
                                            </th>
                                            <th scope="col" className="text-sm font-rubik font-medium text-dark-green py-4 text-left">
                                                Payout
                                            </th>
                                            <th scope="col" className="text-sm font-rubik font-medium text-dark-green py-4 text-left">
                                                Profit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            BetHistoryData.map((data, index) =>
                                                <tr key={data.id}>
                                                    <td className={`text-[11px] ${(index + 1) % 2 != 0 ? "bg-white bg-opacity-50" : "bg-none"} text-teal-600 font-semibold font-poppins py-2 `}>
                                                        {data.betId}
                                                    </td>
                                                    <td className={`text-[11px] ${(index + 1) % 2 != 0 ? "bg-white bg-opacity-50" : "bg-none"} text-teal-600 font-semibold font-poppins py-2 `}>
                                                        {data.time}
                                                    </td>
                                                    <td className={`text-[11px] ${(index + 1) % 2 != 0 ? "bg-white bg-opacity-50" : "bg-none"} text-teal-600 font-semibold font-poppins py-2 `}>
                                                        {data.user}
                                                    </td>
                                                    <td className={`text-[11px] ${(index + 1) % 2 != 0 ? "bg-white bg-opacity-50" : "bg-none"} text-teal-600 font-semibold font-poppins py-2 `}>
                                                        {data.coin}
                                                    </td>
                                                    <td className={`text-[11px] ${(index + 1) % 2 != 0 ? "bg-white bg-opacity-50" : "bg-none"} text-teal-600 font-semibold font-poppins py-2 `}>
                                                        {data.bet}
                                                    </td>
                                                    <td className={`text-[11px] ${(index + 1) % 2 != 0 ? "bg-white bg-opacity-50" : "bg-none"} text-teal-600 font-semibold font-poppins py-2 `}>
                                                        {data.payout}
                                                    </td>
                                                    <td className={`text-[11px] ${(index + 1) % 2 != 0 ? "bg-white bg-opacity-50" : "bg-none"} text-teal-600 font-semibold font-poppins py-2 `}>
                                                        {data.profit}
                                                    </td>
                                                </tr>
                                            )
                                        }

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