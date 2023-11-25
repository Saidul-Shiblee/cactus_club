import React, { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import useSWR from 'swr';
import { getPlayerBalance } from '../../ApiFetcher/fetcher';
import Icon2 from './../../assets/icons/USDC.svg';
import Icon from './../../assets/icons/USDT.svg';

const UiDropdownBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {

        setIsLoggedIn,
        setAuthToken,
        setCurrencyBalance,
    } = useGlobalContext();
    const {data} = useSWR("balance", getPlayerBalance);
    // console.log(data.data.ETHER)
    return (
        <div>
            <div className="inline-flex bg-white ">
                <div onClick={() => setIsOpen(!isOpen)} className="inline-flex">
                    <div>
                        <button
                            className={`deposit-btn relative rounded font-poppins text-[14px] font-bold uppercase text-white flex items-center justify-center gap-2 md:w-[197px] w-full h-[43px]`}
                        >
                            <span className="h-min inline-block">BALANCE: {data?.data?.ETHER} ETH</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                className={`h-min mt-2`}
                            >
                                <path
                                    d="M9.5 8V2.82843C9.5 1.04662 7.34572 0.154284 6.08579 1.41421L0.914215 6.58578C-0.345714 7.84571 0.546618 10 2.32843 10H7.5C8.60457 10 9.5 9.10457 9.5 8Z"
                                    fill="#FFD55A"
                                />
                            </svg>
                        </button>

                    </div>

                    <div
                        className={`-translate-x-1/2 left-1/2 md:left-auto md:translate-x-0  rounded-full absolute right-0 md:right-[153px] z-10 w-[375px] md:w-[309px] mt-10 md:mt-16 origin-top-right bg-white  md:rounded-[20px] shadow-lg`}
                    >
                        {/* {isOpen && (
                            <div className="relative">
                                <div className="hidden md:block absolute arrow-up right-[30px] -top-2 "></div>
                            </div>
                        )} */}
                        {isOpen ? (
                            <ul className="flex top-[100%] rounded-[20px] bg-white left-0 right-0  justify-between flex-col py-[12px] md:py-0 rounded-b-[30px] px-[20px] ">
                                <h2 className="text-xs uppercase text-primary-title font-poppins mt-[40px] mb-[12px]">
                                Change Token
                                </h2>
                                <div className="border-b">
                                    <div className='hover:bg-deposite-hover'>
                                    <li id="listbox-item-0" role="option" className="relative py-2 text-gray-900 cursor-default select-none pr-9">
                                        <span className="flex items-center">
                                            <img src={Icon2} alt="Icon" />
                                            <span className="block ml-2 truncate text-[#13BC87] font-poppins font-semibold uppercase">
                                            USDC - {`<balance amount>`}
                                            </span>
                                        </span>
                                    </li>
                                    </div>
                                    <li id="listbox-item-0" role="option" className="relative py-2 text-gray-900 cursor-default select-none hover:bg-deposite-hover pr-9">
                                        <span className="flex items-center">
                                            <img src={Icon} alt="Icon" />
                                            <span className="block truncate ml-2 text-[#13BC87] font-poppins font-semibold uppercase">
                                            USDT - {`<balance amount>`}
                                            </span>
                                        </span>
                                    </li>
                                    {/* {AvartarDropDownItem.map(({ id, label, href }) => (
                                        <li
                                            key={id}
                                            className="mr-[24px] ml-[20px] py-[5px] md:py-0"
                                        >
                                            <Link
                                                className="font-poppins text-[14px] font-semibold text-link uppercase tracking-[2px] flex justify-between pb-[16px]"
                                                to={href}
                                            >
                                                {label} <img src={RightIcon} alt="icon" />
                                            </Link>
                                        </li>
                                    ))} */}
                                </div>
                                <li className="my-[20px] cursor-pointer  ">
                                    <div className=" block truncate text-[#13BC87] font-poppins font-semibold uppercase ">
                                        Deposite
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