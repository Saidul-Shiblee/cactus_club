import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './../assets/icons/ETH.svg';
import Icon2 from './../assets/icons/USDC.svg';
import Icon3 from './../assets/icons/USDT.svg';
import { getPlayerBalance, getPlayerWallet } from '../ApiFetcher/fetcher';
import useSWR from 'swr';
import { useGlobalContext } from '../context/context';
import axios from 'axios';
import { URL } from '../ApiFetcher/fetcher';

const DepositeInputs = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [playerWallet, setPlayerWallet] = useState();
    const {setCurrencyBalance} = useGlobalContext();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    //get Player Balance
    const {data} = useSWR('balance', getPlayerBalance);
    // setCurrencyBalance({
    //     ETHER: data?.data?.ETHER,
    //     USDC: data?.data?.USDC,
    //     USDT: data?.data?.USDT,
    // })
    const {data: data1} = useSWR('wallet', getPlayerWallet);
    useEffect(() => {
        setCurrencyBalance({
            ETHER: data?.data?.ETHER,
            USDC: data?.data?.USDC,
            USDT: data?.data?.USDT,
        })
    },[])
    // const getPlayerWallets = async() => {
    //    try {
    //     const res = await axios.get("https://apis.yummylabs.io/getPlayerWallet", {
    //         headers: {
    //             "Authorization": localStorage.getItem("cactus_club_token")
    //         }
    //     })
    //     // console.log(res.data.data.wallet)
    //     setPlayerWallet(res.data);
    //    } catch (error) {
    //     console.log(error)
    //    }

    // }
    // useEffect(() => {
    //     // setPlayerWallet(getPlayerWallet);
    //     // console.log(getPlayerWallet);
    //     getPlayerWallets();
    // },[])
    
    // const {walletData} = useSWR('wallet', getPlayerWallet);

    console.log(data);

    return (
        <div className=''>
            <div className="flex items-center h-[34px] justify-center md:mt-[93px] text-primary-title">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "ignup-link font-poppins text-[24px] font-bold uppercase underline underline-offset-[12px] decoration-4 decoration-[#13BC87]"
                            : "ignup-link font-poppins text-[24px] font-bold uppercase  "
                    }
                    to="/deposite"
                >
                    Deposite
                </NavLink>
                <div className="font-poppins text-[24px] font-bold uppercase px-[16px]">
                    i
                </div>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "ignup-link font-poppins text-[24px] font-bold uppercase underline underline-offset-[12px] decoration-4 decoration-[#13BC87]"
                            : "ignup-link font-poppins text-[24px] font-bold uppercase  "
                    }
                    to="/withdraw"
                >
                    Withdraw
                </NavLink>
            </div>

            <div className='mx-2 md:mx-[427px]'>
                <div className="relative flex flex-col mt-[24px]">
                    <label
                        htmlFor="token"
                        className=" text-primary-title text-[12px] pb-[12px] font-bold font-poppins uppercase"
                    >
                        select token
                    </label>

                    <div className="w-full">
                        <div className="relative h-[69px]">
                            <button type="button" onClick={toggleDropdown} className="relative w-full h-full px-[40px] py-[24px] text-left bg-orange-primary rounded-[20px] shadow-lg cursor-default md:text-base font-bold text-primary-title focus:outline-none sm:text-sm">

                                <span className="flex items-center">
                                    <img src={Icon} alt="Icon" />
                                    <span className="block ml-3 truncate">
                                        eth (Ethereum Mainnet) - BALANCE: {data?.data?.ETHER}
                                    </span>
                                    <span className='ml-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                                            <g clipPath="url(#clip0_1_1292)">
                                                <path d="M8.61309 10.0293L13.8849 4.75758C14.7234 3.91904 14.1295 2.48528 12.9436 2.48528L2.40011 2.48528C1.21424 2.48528 0.620357 3.91904 1.45889 4.75758L6.73066 10.0293C7.25048 10.5492 8.09327 10.5492 8.61309 10.0293Z" fill="#5E3D1C" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1_1292">
                                                    <rect width="16" height="12" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                </span>


                            </button>
                            {
                                isDropdownOpen &&
                                <div className={`absolute top-full bottom-0 left-0 z-10 w-full bg-orange-primary rounded-[20px] dropdown-shadow h-min py-[24px] mt-[-2px]`}>
                                    <ul className="py-1 overflow-auto text-base rounded-md max-h-56 focus:outline-none sm:text-sm">
                                        <h3 className=' mx-[40px]'>Select</h3>
                                        <li id="listbox-item-0" role="option" className="relative py-2 text-gray-900 cursor-default select-none hover:bg-deposite-hover pr-9">
                                            <span className="flex items-center mx-[40px]">
                                                <img src={Icon2} alt="Icon" />
                                                <span className="block ml-3 truncate text-primary-title font-bold uppercase">
                                                USDC (Ethereum Mainnet) - BALANCE: {data?.data?.USDC}
                                                </span>
                                            </span>
                                        </li>
                                        <li id="listbox-item-0" role="option" className="relative py-2 text-gray-900 cursor-default select-none hover:bg-deposite-hover pr-9">
                                            <span className="flex items-center mx-[40px]">
                                                <img src={Icon3} alt="Icon" />
                                                <span className="block ml-3 truncate text-primary-title font-bold uppercase">
                                                USDT (Ethereum Mainnet) - BALANCE: {data?.data?.USDT}
                                                </span>
                                            </span>
                                        </li>
                                        <li id="listbox-item-0" role="option" className="relative py-2 text-gray-900 cursor-default select-none hover:bg-deposite-hover pr-9">
                                            <span className="flex items-center mx-[40px]">
                                                <img src={Icon} alt="Icon" />
                                                <span className="block ml-3 truncate text-primary-title font-bold uppercase">
                                                    eth (Ethereum Mainnet) - BALANCE: {data?.data?.ETHER}
                                                </span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>

                </div>

                <div className="relative flex flex-col mt-[24px]">
                    <label
                        htmlFor="deposite"
                        className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
                    >
                        unique Ethereum mainnet deposit address
                    </label>
                    <input
                        type="text"
                        id="deposite"
                        className=" w-full rounded-[20px] px-2 md:px-[40px] py-[24px] bg-orange-primary
                   cactus-text-color font-poppins text-[16px] font-black uppercase placeholder:text-primary-title focus:outline-none border-r-2"
                        name="deposite"
                        disabled
                        value={data1?.data?.wallet}

                    />
                </div>
                <p className="text-end w-full">
                    <Link
                        className=" text-input-link underline font-poppins font-bold text-[12px] uppercase"
                        to="/"
                    >
                        generate a new deposit address
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default DepositeInputs;