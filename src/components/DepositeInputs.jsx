import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "./../assets/icons/ETH.svg";
import Icon2 from "./../assets/icons/USDC.svg";
import Icon3 from "./../assets/icons/USDT.svg";
import { useGlobalContext } from "../context/context";


const DepositeInputs = ({ balance, wallet, }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const { selectedCurrency, setSelectedCurrency } = useGlobalContext();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const inputRef = useRef(null);
  const dropdownRef = useRef();


  const handleCopy = () => {
    inputRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  const handleCloseDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);

    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);


  return (
    <div className="mx-auto px-[15px] md:px-0 flex flex-col items-center">
      <div className="relative flex flex-col  w-[345px] md:w-[585px]">
        <label
          htmlFor="token"
          className=" text-primary-title text-[12px] pb-[12px] font-bold font-poppins uppercase"
        >
          select token
        </label>

        <div ref={dropdownRef} className=" ">
          <div className="relative h-[54px] md:h-[72px]">
            <button
              type="button"
              onClick={toggleDropdown}
              className="cursor-pointer relative w-full h-full px-[40px]  text-left bg-orange-primary rounded-[20px] shadow-lg  md:text-base font-bold text-primary-title focus:outline-none sm:text-sm"
            >
              <div className="flex items-center justify-between">
                {selectedCurrency === "ETH" && (
                  <div className="flex items-center truncate uppercase">
                    <img src={Icon} alt="Icon" />
                    <p className=" ml-3 ">
                      ETH (Ethereum Mainnet):
                      {balance?.data?.ETHER || 0}
                    </p>
                  </div>
                )}
                {selectedCurrency === "USDC" && (
                  <div className="flex items-center truncate uppercase">
                    <img src={Icon2} alt="Icon" />
                    <p className=" ml-3 ">
                      USDC (Ethereum Mainnet):
                      {balance?.data?.USDC || 0}
                    </p>
                  </div>
                )}
                {selectedCurrency === "USDT" && (
                  <div className="flex items-center truncate uppercase">
                    <img src={Icon3} alt="Icon" />
                    <p className=" ml-3 ">
                      USDT (Ethereum Mainnet):
                      {balance?.data?.USDT || 0}
                    </p>
                  </div>
                )}

                <span className=" block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1_1292)">
                      <path
                        d="M8.61309 10.0293L13.8849 4.75758C14.7234 3.91904 14.1295 2.48528 12.9436 2.48528L2.40011 2.48528C1.21424 2.48528 0.620357 3.91904 1.45889 4.75758L6.73066 10.0293C7.25048 10.5492 8.09327 10.5492 8.61309 10.0293Z"
                        fill="#5E3D1C"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_1292">
                        <rect width="16" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute top-full bottom-0 left-0 z-10 w-full bg-orange-primary rounded-[20px] dropdown-shadow h-min pt-[16px] pb-[24px] mt-[-2px]`}
              >
                <ul className="py-1 overflow-auto text-base rounded-md max-h-56 focus:outline-none sm:text-sm">
                  <h3 className=" mx-[40px] mb-[12px] text-xs font-bold uppercase">
                    Select
                  </h3>
                  <li
                    id="listbox-item-0"
                    role="option"
                    className="relative text-gray-900  select-none hover:bg-deposite-hover pr-9 cursor-pointer"
                    onClick={() => {
                      setSelectedCurrency("USDC");
                      localStorage.setItem("cactus_club_selected_currency", "USDC");

                      toggleDropdown();
                    }}
                  >
                    <span className="flex items-center h-[40px] mx-[40px]">
                      <img src={Icon2} alt="Icon" />
                      <span className="block ml-3 truncate text-primary-title font-bold uppercase mb-[4px]">
                        USDC (Ethereum Mainnet): {balance?.data?.USDC}
                      </span>
                    </span>
                  </li>
                  <li
                    id="listbox-item-0"
                    role="option"
                    className="relative text-gray-900 cursor-pointer select-none hover:bg-deposite-hover pr-9"
                    onClick={() => {
                      setSelectedCurrency("USDT");
                      localStorage.setItem("cactus_club_selected_currency", "USDT");
                      toggleDropdown();
                    }}
                  >
                    <span className="flex items-center h-[40px] mx-[40px] mb-[4px] ">
                      <img src={Icon3} alt="Icon" />
                      <span className="block ml-3 truncate text-primary-title font-bold uppercase">
                        USDT (Ethereum Mainnet): {balance?.data?.USDT}
                      </span>
                    </span>
                  </li>
                  <li
                    id="listbox-item-0"
                    role="option"
                    className="relative text-gray-900 cursor-pointer select-none hover:bg-deposite-hover pr-9"
                    onClick={() => {
                      setSelectedCurrency("ETH");
                      localStorage.setItem("cactus_club_selected_currency", "ETH");
                      toggleDropdown();
                    }}
                  >
                    <span className="flex items-center h-[40px] mx-[40px] mb-[4px]">
                      <img src={Icon} alt="Icon" />
                      <span className="block ml-3 truncate text-primary-title font-bold uppercase">
                        eth (Ethereum Mainnet): {balance?.data?.ETHER}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col  mt-[24px] w-[345px] md:w-[585px]">
        <label
          htmlFor="deposite"
          className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
        >
          unique Ethereum mainnet deposit address
        </label>
        <div className=" w-full rounded-[20px] px-2 md:px-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <input
            type="text"
            id="deposite"
            ref={inputRef}
            className="w-full bg-orange-primary outline-none"
            name="deposite"
            readOnly
            value={wallet?.data?.wallet}
          />
          <div className="flex justify-center items-center cursor-pointer" onClick={handleCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
            <mask id="path-1-inside-1_570_1899" fill="white">
              <path d="M18.1644 3.39624H16.6903C16.6596 3.39624 16.6323 3.40679 16.6038 3.4137V1.86578C16.6038 0.836904 15.7477 0 14.6952 0H1.90853C0.856071 0 0 0.836904 0 1.86578V19.2663C0 20.2952 0.856071 21.1321 1.90854 21.1321H4.15094V21.9745C4.15094 22.9665 4.97421 23.7736 5.98652 23.7736H18.1644C19.1767 23.7736 20 22.9665 20 21.9745V5.19531C20 4.20328 19.1767 3.39624 18.1644 3.39624ZM0.754699 19.2663V1.86578C0.754699 1.25331 1.27248 0.754737 1.90854 0.754737H14.6952C15.3313 0.754737 15.8491 1.25331 15.8491 1.86578V19.2663C15.8491 19.8788 15.3313 20.3774 14.6952 20.3774H1.90854C1.27248 20.3774 0.754699 19.8788 0.754699 19.2663ZM19.2453 21.9745C19.2453 22.5505 18.7603 23.0189 18.1644 23.0189H5.98652C5.39062 23.0189 4.90564 22.5505 4.90564 21.9745V21.1321H14.6952C15.7477 21.1321 16.6038 20.2952 16.6038 19.2663V4.13348C16.6323 4.14039 16.6596 4.15094 16.6903 4.15094H18.1644C18.7603 4.15094 19.2453 4.61932 19.2453 5.19531V21.9745Z" />
            </mask>
            <path d="M18.1644 3.39624H16.6903C16.6596 3.39624 16.6323 3.40679 16.6038 3.4137V1.86578C16.6038 0.836904 15.7477 0 14.6952 0H1.90853C0.856071 0 0 0.836904 0 1.86578V19.2663C0 20.2952 0.856071 21.1321 1.90854 21.1321H4.15094V21.9745C4.15094 22.9665 4.97421 23.7736 5.98652 23.7736H18.1644C19.1767 23.7736 20 22.9665 20 21.9745V5.19531C20 4.20328 19.1767 3.39624 18.1644 3.39624ZM0.754699 19.2663V1.86578C0.754699 1.25331 1.27248 0.754737 1.90854 0.754737H14.6952C15.3313 0.754737 15.8491 1.25331 15.8491 1.86578V19.2663C15.8491 19.8788 15.3313 20.3774 14.6952 20.3774H1.90854C1.27248 20.3774 0.754699 19.8788 0.754699 19.2663ZM19.2453 21.9745C19.2453 22.5505 18.7603 23.0189 18.1644 23.0189H5.98652C5.39062 23.0189 4.90564 22.5505 4.90564 21.9745V21.1321H14.6952C15.7477 21.1321 16.6038 20.2952 16.6038 19.2663V4.13348C16.6323 4.14039 16.6596 4.15094 16.6903 4.15094H18.1644C18.7603 4.15094 19.2453 4.61932 19.2453 5.19531V21.9745Z" fill="#5E3D1C" />
            <path d="M16.6038 3.4137H14.6038V5.95512L17.074 5.35764L16.6038 3.4137ZM16.6038 1.86578H18.6038H16.6038ZM4.15094 21.1321H6.15094V19.1321H4.15094V21.1321ZM4.15094 21.9745H2.15094H4.15094ZM20 5.19531H22V5.1953L20 5.19531ZM1.90854 20.3774V18.3774H1.90853L1.90854 20.3774ZM4.90564 21.1321V19.1321H2.90564V21.1321H4.90564ZM16.6038 4.13348L17.074 2.18954L14.6038 1.59205V4.13348H16.6038ZM18.1644 1.39624H16.6903V5.39624H18.1644V1.39624ZM16.6903 1.39624C16.4474 1.39624 16.2575 1.43839 16.1686 1.46024C16.1271 1.47047 16.09 1.48094 16.0896 1.48105C16.0791 1.48398 16.1032 1.47711 16.1336 1.46976L17.074 5.35764C17.1186 5.34684 17.1569 5.33605 17.1604 5.33506C17.1741 5.33125 17.1512 5.33779 17.1239 5.34451C17.0635 5.35936 16.9026 5.39624 16.6903 5.39624V1.39624ZM18.6038 3.4137V1.86578H14.6038V3.4137H18.6038ZM18.6038 1.86578C18.6038 -0.310134 16.8093 -2 14.6952 -2V2C14.6828 2 14.6625 1.9933 14.6461 1.9772C14.6378 1.96913 14.6273 1.95585 14.6185 1.93545C14.609 1.91354 14.6038 1.88856 14.6038 1.86578H18.6038ZM14.6952 -2H1.90853V2H14.6952V-2ZM1.90853 -2C-0.205546 -2 -2 -0.310134 -2 1.86578H2C2 1.88856 1.9948 1.91354 1.9853 1.93544C1.97646 1.95585 1.96596 1.96913 1.9577 1.9772C1.94124 1.9933 1.92096 2 1.90853 2V-2ZM-2 1.86578V19.2663H2V1.86578H-2ZM-2 19.2663C-2 21.4422 -0.205547 23.1321 1.90854 23.1321V19.1321C1.92096 19.1321 1.94124 19.1388 1.9577 19.1549C1.96596 19.1629 1.97646 19.1762 1.9853 19.1966C1.9948 19.2185 2 19.2435 2 19.2663H-2ZM1.90854 23.1321H4.15094V19.1321H1.90854V23.1321ZM2.15094 21.1321V21.9745H6.15094V21.1321H2.15094ZM2.15094 21.9745C2.15094 24.1087 3.90761 25.7736 5.98652 25.7736V21.7736C6.02068 21.7736 6.05978 21.789 6.08909 21.8177C6.11904 21.8471 6.15094 21.9038 6.15094 21.9745H2.15094ZM5.98652 25.7736H18.1644V21.7736H5.98652V25.7736ZM18.1644 25.7736C20.2433 25.7736 22 24.1087 22 21.9745H18C18 21.9038 18.0319 21.8471 18.0619 21.8177C18.0912 21.789 18.1303 21.7736 18.1644 21.7736V25.7736ZM22 21.9745V5.19531H18V21.9745H22ZM22 5.1953C22 3.06112 20.2433 1.39624 18.1644 1.39624V5.39624C18.1303 5.39624 18.0912 5.3808 18.0619 5.35207C18.0319 5.32272 18 5.266 18 5.19531L22 5.1953ZM2.7547 19.2663V1.86578H-1.2453V19.2663H2.7547ZM2.7547 1.86578C2.7547 2.42845 2.30513 2.75474 1.90854 2.75474V-1.24526C0.239827 -1.24526 -1.2453 0.078174 -1.2453 1.86578H2.7547ZM1.90854 2.75474H14.6952V-1.24526H1.90854V2.75474ZM14.6952 2.75474C14.2986 2.75474 13.8491 2.42845 13.8491 1.86578H17.8491C17.8491 0.0781744 16.3639 -1.24526 14.6952 -1.24526V2.75474ZM13.8491 1.86578V19.2663H17.8491V1.86578H13.8491ZM13.8491 19.2663C13.8491 18.7037 14.2985 18.3774 14.6952 18.3774V22.3774C16.364 22.3774 17.8491 21.0538 17.8491 19.2663H13.8491ZM14.6952 18.3774H1.90854V22.3774H14.6952V18.3774ZM1.90853 18.3774C2.30522 18.3774 2.7547 18.7037 2.7547 19.2663H-1.2453C-1.2453 21.0538 0.239737 22.3774 1.90854 22.3774L1.90853 18.3774ZM17.2453 21.9745C17.2453 21.3815 17.7213 21.0189 18.1644 21.0189V25.0189C19.7994 25.0189 21.2453 23.7195 21.2453 21.9745H17.2453ZM18.1644 21.0189H5.98652V25.0189H18.1644V21.0189ZM5.98652 21.0189C6.42957 21.0189 6.90564 21.3814 6.90564 21.9745H2.90564C2.90564 23.7196 4.35167 25.0189 5.98652 25.0189V21.0189ZM6.90564 21.9745V21.1321H2.90564V21.9745H6.90564ZM4.90564 23.1321H14.6952V19.1321H4.90564V23.1321ZM14.6952 23.1321C16.8093 23.1321 18.6038 21.4422 18.6038 19.2663H14.6038C14.6038 19.2435 14.609 19.2185 14.6185 19.1966C14.6273 19.1762 14.6378 19.1629 14.6461 19.1549C14.6625 19.1388 14.6828 19.1321 14.6952 19.1321V23.1321ZM18.6038 19.2663V4.13348H14.6038V19.2663H18.6038ZM16.1336 6.07743C16.1032 6.07008 16.0791 6.0632 16.0896 6.06613C16.09 6.06624 16.1271 6.07672 16.1686 6.08694C16.2575 6.10879 16.4474 6.15094 16.6903 6.15094V2.15094C16.9026 2.15094 17.0635 2.18782 17.1238 2.20266C17.1512 2.20938 17.1741 2.21593 17.1604 2.21212C17.1568 2.21113 17.1186 2.20034 17.074 2.18954L16.1336 6.07743ZM16.6903 6.15094H18.1644V2.15094H16.6903V6.15094ZM18.1644 6.15094C17.7213 6.15094 17.2453 5.7883 17.2453 5.19531H21.2453C21.2453 3.45034 19.7994 2.15094 18.1644 2.15094V6.15094ZM17.2453 5.19531V21.9745H21.2453V5.19531H17.2453Z" fill="#5E3D1C" mask="url(#path-1-inside-1_570_1899)" />
          </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositeInputs;
