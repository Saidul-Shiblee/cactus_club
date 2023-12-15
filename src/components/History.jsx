import React, { useEffect, useRef } from 'react'
import ADI from "../assets/icons/arrow_down_icon.svg";
import { useState } from 'react'
import Uparrow from "../assets/icons/uparrow.svg"; import { getPlayerTransactionHistory } from '../ApiFetcher/fetcher';
import useSWR from 'swr';
import { filterArray, formatDate, formatDateTime, formattedTime, trimText } from '../utilities/utilitiesFunction';
import { useGlobalContext } from '../context/context';
;

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const random = React.useRef(Date.now());
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all')
  const { authToken } =
    useGlobalContext();



  //get Player Balance
  const { data, isLoading } = useSWR(
    ["history", random],
    getPlayerTransactionHistory(authToken)
  );


  // const abc=filterArray(data?.data,'Deposit')
  // console.log(abc);

  useEffect(() => {
    if (data?.data) {
      setTransactions(data?.data);
    } else {
      setTransactions([])
    }

  }, [data]);

  return (
    <div className='"w-full  relative'>
      <div className="w-full px-[12px] md:px-[142px] overflow-x-auto ">
        <table className="w-full mb-[168px]  md:mb-[383px]">
          <thead>
            <tr>
              <th className="text-left font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color pl-[24px] ">
                <div className="text-center  ">Date</div>
              </th>
              <th className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color  relative">
                <div
                  className="text-center  flex justify-center items-center  cursor-pointer
                
                
                "
                  onClick={() => setIsOpen(!isOpen)}
                >
                  type{" "}
                  <img
                    src={ADI}
                    alt="icon"
                    className="md:h-[28px] md:w-[40px] h-[15px] w-[28px]"
                  />
                  {isOpen && (
                    <div
                      className={`py-[16px] absolute top-12 md:top-10     z-10 w-[158px]    origin-top-right bg-white  rounded-[20px] dropdown-shadow`}
                    >
                      <div className="w-full relative ">
                        <img
                          src={Uparrow}
                          alt="Icon"
                          className="absolute h-[31px] w-[32px] left-1/2 -translate-x-1/2 -top-[31px]"
                        />
                      </div>

                      <ul className="flex top-[100%] rounded-[20px] bg-white left-0 right-0  justify-between flex-col py-[16px] md:py-0 rounded-b-[30px]  ">
                        <li
                          onClick={() => setFilter("Deposit")}
                          id="listbox-item-0"
                          role="option"
                          className="relative h-[48px] my-auto text-[#5E3D1C] text-[14px] cursor-default select-none  px-[18px] items-center gap-[12px] flex hover:bg-[#E7F8F3]"
                        >
                          <span className="block ml-2 truncate  font-poppins font-semibold uppercase">
                            Deposit
                          </span>
                        </li>

                        <li
                          onClick={() => setFilter("Withdrawal")}
                          id="listbox-item-0"
                          role="option"
                          className="relative h-[48px] my-auto text-[#5E3D1C] text-[14px] cursor-default select-none  px-[18px] items-center gap-[12px] flex hover:bg-[#E7F8F3]"
                        >
                          <span className="block ml-2 truncate  font-poppins font-semibold uppercase">
                            Withdrawal
                          </span>
                        </li>

                        <li
                          onClick={() => setFilter("all")}
                          id="listbox-item-0"
                          role="option"
                          className="relative h-[48px] my-auto text-[#5E3D1C] text-[14px] cursor-default select-none  px-[18px] items-center gap-[12px] flex hover:bg-[#E7F8F3]"
                        >
                          <span className="block ml-2 truncate  font-poppins font-semibold uppercase">
                            All
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </th>
              <th className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color ">
                <div className="text-center    ">status</div>
              </th>
              <th className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color ">
                <div className="text-center  ">Amount</div>
              </th>
              <th className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color ">
                <div className="text-center  ">Token</div>
              </th>
              <th className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color ">
                <div className="text-center ">Address</div>
              </th>
              <th className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color pr-[44px]">
                <div className="text-center ">Transaction ID</div>
              </th>
            </tr>
            <div className="mb-5"> </div>
          </thead>
          <tbody className="">
            {data?.data && data?.data.length > 0 &&
              filterArray(data?.data, filter)?.map((el, index) => (
                <React.Fragment key={el?.TransactionID}>
                  <tr
                    className={`${(index + 1) % 2 != 0
                      ? "bg-orange-primary"
                      : "bg-[#FFF5EB]"
                      }`}
                  >
                    <td className=" font-poppins font-semibold text-[10px] lg:text-[13px] uppercase table-font-color  h-[54px] !rounded-tl-[50px]  !rounded-bl-[50px] pl-[24px] w-full">
                      <div className="text-center flex justify-center  gap-[44px] ml-[44px] items-center">
                        {formattedTime(el?.Date)}
                        <div className="td-broder"></div>
                      </div>
                    </td>
                    <td className=" font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color  h-[54px]">
                      <div className="text-center flex justify-center gap-[44px] ml-[44px] items-center">
                        {el?.Type}
                        <div className="td-broder"></div>
                      </div>
                    </td>
                    <td className=" font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color  h-[54px]">
                      <div className="text-center flex justify-center gap-[44px] ml-[44px] items-center">
                        {el?.Status}
                        <div className="td-broder"></div>
                      </div>
                    </td>
                    <td className=" font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color  h-[54px]">
                      <div className="text-center flex justify-center gap-[44px] ml-[44px] items-center">
                        {el?.Amount}
                        <div className="td-broder"></div>
                      </div>
                    </td>
                    <td className=" font-poppins font-semibold text-[10px] lg:text-[16px] table-font-color  h-[54px]">
                      <div className="text-center flex justify-center gap-[44px] ml-[44px] items-center">
                        {el?.Token}
                        <div className="td-broder"></div>
                      </div>
                    </td>
                    <td className=" font-poppins font-semibold text-[10px] lg:text-[16px] table-font-color  h-[54px] group flex relative">
                      {/* <div className="group flex relative"> */}
                        <div className="text-center flex justify-center gap-[44px] ml-[44px] items-center ">
                          {trimText(el?.Address, 10)}

                          <div className="td-broder"></div>
                        </div>
                        {/* <div className="group flex relative"> */}
                          {/* <span className="bg-red-400 text-white px-2 py-1">Button</span> */}
                          <span className="group-hover:opacity-100 transition-opacity bg-primary-hover px-2 py-3 text-sm text-primary-title rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">{el?.Address} </span>
                        {/* </div> */}
                      {/* </div> */}

                    </td>
                    <td className=" font-poppins font-semibold text-[10px] lg:text-[16px] table-font-color  h-[54px] !rounded-tr-[50px]  !rounded-br-[50px] pr-[44px]">
                      <div className='group flex relative flex-wrap'>
                      <a href={`https://etherscan.io/tx/${el?.TransactionID}`} className="text-center flex justify-center gap-[44px]  items-center">
                        {trimText(el?.TransactionID, 10)}
                      </a>
                      <div className="group-hover:opacity-100 transition-opacity bg-primary-hover px-2 py-3 text-sm text-primary-title rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">{el?.TransactionID} </div>
                      </div>
                    </td>
                  </tr>
                  <div className="mb-5 "> </div>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-history-lg hidden md:block h-[241px] bg-cover bg-no-repeat absolute left-0 bottom-0 -z-[1]"></div>
      <div className="w-full bg-history-sm md:hidden block h-[139px] bg-cover bg-no-repeat absolute left-0 bottom-0 -z-[1]"></div>
    </div>
  );
}

export default History