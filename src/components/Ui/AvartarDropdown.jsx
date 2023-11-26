import React, { useState } from 'react';
import CactusTree from './../../assets/icons/cactusTree.svg';
// import RightIcon from "../../../assets/icons/chevron-right.svg"
import RightIcon from './../../assets/icons/chevron-right.svg';
import LogOut from './../../assets/icons/log-out.svg';
import { AvartarDropDownItem } from '../../assets/data/local.db';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import Uparrow from "./../../assets/icons/uparrow.svg";


const AvartarDropdown = (classes = '') => {

   const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const {
      
      setIsLoggedIn,
      setAuthToken,
      setCurrencyBalance,
    } = useGlobalContext();

  const handleLogOut=()=>{
    setAuthToken("")
    setIsLoggedIn(false)
    setCurrencyBalance(null)
    localStorage.removeItem("cactus_club_token");
    localStorage.removeItem("cactus_club_currency_balance");
    navigate('/')
    
   }

    return (
      <div>
        <div className="inline-flex bg-white ">
          <div onClick={() => setIsOpen(!isOpen)} className="inline-flex">
            <div className=" text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md">
              <img
                src={CactusTree}
                className="rounded-full h-8 p-2 bg-[#14BD87] bg-opacity-20"
                alt="cactus trees"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center justify-center h-full px-2 text-gray-600 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-link"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`-translate-x-1/2 left-1/2 md:left-auto md:translate-x-0  rounded-full absolute right-0 md:right-[153px] z-10 w-[375px] md:w-[309px] mt-10 md:mt-[60px] origin-top-right bg-white  md:rounded-[20px] dropdown-shadow ${classes}`}
            >
              {isOpen && (
                <div className="relative">
                  <img
                    src={Uparrow}
                    alt="Icon"
                    className="hidden md:block absolute h-[31px] w-[32px] right-[25px]  -top-[15px]"
                  />
               
                </div>
              )}
              {isOpen ? (
                <ul className="flex top-[100%] rounded-[20px] bg-white left-0 right-0  justify-between flex-col py-[12px] md:py-0 rounded-b-[30px] px-[20px] ">
                  <h2 className="text-[24px] uppercase text-primary-title font-rubik ml-[20px] mt-[40px] mb-[32px]">
                    menu
                  </h2>
                  <div className="border-b">
                    {AvartarDropDownItem.map(({ id, label, href }) => (
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
                    ))}
                  </div>
                  <li
                    onClick={handleLogOut}
                    className=" mx-[10px] mb-[45px] cursor-pointer  "
                  >
                    <div className=" text-link font-poppins text-[14px] font-semibold  uppercase py-[10px] px-[12px] flex justify-between">
                      Log Out <img src={LogOut} alt="icon" />
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

export default AvartarDropdown;


/* Polygon 1 */


