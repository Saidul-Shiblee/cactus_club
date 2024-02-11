import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import useSWR from 'swr';
import { getPlayerBalance } from '../../ApiFetcher/fetcher';
import Icon2 from './../../assets/icons/USDC.svg';
import Icon1 from './../../assets/icons/USDT.svg';
import Icon from './../../assets/icons/ETH.svg';
import Uparrow from './../../assets/icons/uparrow.svg';
import RightIcon from "./../../assets/icons/chevron-right.svg";

const UiDropdownBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectedCurrency, setSelectedCurrency,
    currencyBalance,
  } = useGlobalContext();
  const dropdownRef = useRef();

  const handleCloseDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);

    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);



  const CurrencyDetails = [
    {
      id: 1,
      name: 'ETH',
      balance: currencyBalance?.ETHER,
      logo: Icon,
    },
    {
      id: 2,
      name: 'USDT',
      balance: currencyBalance?.USDT,
      logo: Icon1,
    },
    {
      id: 3,
      name: 'USDC',
      balance: currencyBalance?.USDC,
      logo: Icon2,
    },
  ];

  const filteredCurrency = CurrencyDetails.filter(
    (el) => el.name !== selectedCurrency
  );

  return (
    <div ref={dropdownRef}>
      <div className="inline-flex bg-white ">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex relative"
        >
          <div>
            <button
              className={`deposit-btn relative rounded font-poppins text-[14px] font-bold uppercase text-white flex items-center justify-center gap-[4px] w-[92px] md:w-[247px] h-[34px] md:h-[44px]`}
            >
              <span className="h-min md:inline-block hidden text-[18px] ">
                {selectedCurrency === "ETH" &&
                  `BALANCE: ${currencyBalance?.ETHER || 0} ETH`}
                {selectedCurrency === "USDT" &&
                  `BALANCE: ${currencyBalance?.USDT || 0} USDT`}
                {selectedCurrency === "USDC" &&
                  `BALANCE: ${currencyBalance?.USDC || 0} USDC`}
              </span>
              <span className="h-min inline-block md:hidden text-[12px] ">
                {selectedCurrency === "ETH" &&
                  `${currencyBalance?.ETHER || 0} ETH`}
                {selectedCurrency === "USDT" &&
                  `${currencyBalance?.USDT || 0} USDT`}
                {selectedCurrency === "USDC" &&
                  `${currencyBalance?.USDC || 0} USDC`}
              </span>
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.85528 6.38691L9.05583 3.18636C9.89436 2.34783 9.30048 0.914062 8.11461 0.914063L1.71351 0.914062C0.527648 0.914062 -0.0662381 2.34782 0.772296 3.18636L3.97285 6.38691C4.49267 6.90673 5.33546 6.90673 5.85528 6.38691Z"
                  fill="#FFD55A"
                />
              </svg>
            </button>
          </div>

          <div
            className={` absolute top-[15px] md:top-0 -left-[105%] md:left-[-8px]  z-10 w-[266px] md:w-[286px] mt-10 md:mt-16 origin-top-right bg-white  rounded-[20px] dropdown-shadow`}
          >
            {isOpen ? (
              <div className="w-full relative ">
                <img
                  src={Uparrow}
                  alt="Icon"
                  className="absolute h-[31px] w-[32px] left-1/2 -translate-x-1/2 -top-[15px]"
                />
              </div>
            ) : null}

            {isOpen ? (
              <ul className="flex top-[100%] rounded-[20px] bg-white left-0 right-0  justify-between flex-col py-[12px] md:py-0 rounded-b-[30px]  ">
                <h2 className="text-xs font-bold uppercase text-primary-title font-poppins mt-[22px] mb-[12px] px-[24px]">
                  Change Token
                </h2>
                {filteredCurrency.map((el) => (
                  <li
                    onClick={() => {
                      setSelectedCurrency(el.name);
                      localStorage.setItem("cactus_club_selected_currency", el.name);
                    }}
                    key={el.id}
                    id="listbox-item-0"
                    role="option"
                    className="relative h-[48px] my-auto text-gray-900 cursor-default select-none  px-[24px] items-center gap-[12px] flex hover:bg-[#11BB85]/10"
                  >
                    <img src={el.logo} alt="Icon" />
                    <span className="block ml-2 truncate text-[#13BC87] font-poppins font-semibold uppercase">
                      {el.name} - {el.balance}
                    </span>
                  </li>
                ))}
                <li className="px-[18px] mt-4">
                  <span className="block border-b" />
                </li>
                <li className="my-[25px] cursor-pointer px-[24px] ">
                  <div className='hover:text-orange-primary flex justify-between items-center'>
                    <div className=" block truncate text-[#13BC87] font-poppins font-semibold uppercase hover:text-orange-primary">
                      Deposit
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <path d="M9 18.877L15 12.877L9 6.87695" stroke="#16BD88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiDropdownBtn;