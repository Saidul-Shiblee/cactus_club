
import React, { useRef, useState } from "react";
import Icon from "./../assets/icons/ETH.svg";
import Icon2 from "./../assets/icons/USDC.svg";
import Icon3 from "./../assets/icons/USDT.svg";
import { useGlobalContext } from "../context/context";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import axios from "axios";
import UiModal from "./Ui/UiModal";
import UiButton from "./Ui/UiButton";
import ModalImg from "../assets/image/modalImg.png";
import Spinner from "../utilities/spinner";
import { X } from "lucide-react";



const WithDrawForm = ({
  balance,
  balanceLoading,
  wallet,
  walletLoading,
  setCurrentForm,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useGlobalContext();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dropdownRef = useRef()
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (errMsg) {
      setTimeout(() => setErrMsg(""), 6000);
    }
  }, [errMsg]);




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






  useEffect(() => {
    // Load the wallet-address-validator script dynamically
    const script = document.createElement("script");
    script.src = "/src/assets/js/wallet-address-validator.min.js";
    script.async = true;
    script.onload = () => { };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    getValues,
    formState: { errors },
    formState,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const validateWalletAddress = (value) => {
    let isValidAddress = WAValidator.validate(
      value,
      selectedCurrency.toLowerCase()
    );
    return (
      isValidAddress ||
      `Not a valid ${selectedCurrency === "ETH"
        ? "Ethereum"
        : selectedCurrency === "USDT"
          ? "Tether"
          : selectedCurrency === "USDC"
            ? "USD Coin"
            : ""
      } wallet address`
    );
  };
  const onSubmit = async (data) => {

    setLoading(true)
    try {
      const res = await axios({
        method: "post", //you can set what request you want to be
        url: "https://apis.yummylabs.io/withdraw",
        data: {
          To: data.wallet_address,
          Amount: data.withdraw_amount,
          CoinType: selectedCurrency,
        },
        headers: {
          Authorization: localStorage.getItem("cactus_club_token"),
        },
      });

     console.log("respone", res)

      if (res?.data?.code === 1) {
        setModalOpen(true);
      } else if (res?.data?.code === -6) {
        setErrMsg("You do not have sufficient balance");
      } else {
        setErrMsg("Something went wrong");
      }

    } catch (error) {
      setErrMsg("Something went wrong");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="mx-auto px-[15px] md:px-0 flex flex-col items-center pb-[177px] md:pb-[240px] relative">
      <div className="relative flex flex-col  w-[345px] md:w-[585px]">
        <label
          htmlFor="token"
          className=" text-primary-title text-[12px] pb-[12px] font-bold font-poppins uppercase"
        >
          select token
        </label>

        <div className=" ">
          <div ref={dropdownRef} className="relative h-[54px] md:h-[62px]">
            <button
              type="button"
              onClick={toggleDropdown}
              className="cursor-pointer relative w-full h-full px-[40px]  text-left bg-orange-primary rounded-[20px] shadow-lg  md:text-base font-bold text-primary-title focus:outline-none sm:text-sm"
            >
              <div className="flex items-center justify-between ">
                {selectedCurrency === "ETH" && (
                  <div className="flex items-center truncate uppercase">
                    <img src={Icon} alt="Icon" />
                    <p className=" ml-3 text-[12px] md:text-base">
                      ETH - {balance?.data?.ETHER || 0}
                    </p>
                  </div>
                )}
                {selectedCurrency === "USDC" && (
                  <div className="flex items-center truncate uppercase">
                    <img src={Icon2} alt="Icon" />
                    <p className=" ml-3 text-[12px] md:text-base">
                      USDC - {balance?.data?.USDC || 0}
                    </p>
                  </div>
                )}
                {selectedCurrency === "USDT" && (
                  <div className="flex items-center truncate uppercase">
                    <img src={Icon3} alt="Icon" />
                    <p className=" ml-3 text-[12px] md:text-base">
                      USDT - {balance?.data?.USDT || 0}
                    </p>
                  </div>
                )}

                <span className="ml-3 block">
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
                      localStorage.setItem(
                        "cactus_club_selected_currency",
                        "USDC"
                      );
                      toggleDropdown();
                    }}
                  >
                    <span className="flex items-center h-[40px] mx-[40px]">
                      <img src={Icon2} alt="Icon" />
                      <span className="block ml-3 truncate text-primary-title font-bold uppercase mb-[4px] text-[12px] md:text-base">
                        USDC - {balance?.data?.USDC}
                      </span>
                    </span>
                  </li>
                  <li
                    id="listbox-item-0"
                    role="option"
                    className="relative text-gray-900 cursor-pointer select-none hover:bg-deposite-hover pr-9"
                    onClick={() => {
                      setSelectedCurrency("USDT");
                      localStorage.setItem(
                        "cactus_club_selected_currency",
                        "USDT"
                      );
                      toggleDropdown();
                    }}
                  >
                    <span className="flex items-center h-[40px] mx-[40px] mb-[4px] ">
                      <img src={Icon3} alt="Icon" />
                      <span className="block ml-3 truncate text-primary-title font-bold uppercase text-[12px] md:text-base">
                        USDT - {balance?.data?.USDT}
                      </span>
                    </span>
                  </li>
                  <li
                    id="listbox-item-0"
                    role="option"
                    className="relative text-gray-900 cursor-pointer select-none hover:bg-deposite-hover pr-9"
                    onClick={() => {
                      setSelectedCurrency("ETH");
                      localStorage.setItem(
                        "cactus_club_selected_currency",
                        "ETH"
                      );
                      toggleDropdown();
                    }}
                  >
                    <span className="flex items-center h-[40px] mx-[40px] mb-[4px]">
                      <img src={Icon} alt="Icon" />
                      <span className="block ml-3 truncate text-primary-title font-bold uppercase text-[12px] md:text-base">
                        ETH - {balance?.data?.ETHER}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <form
        className="flex flex-col items-center md:items-start "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex flex-col mt-[24px]">
          <label
            htmlFor="wallet_address"
            className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase "
          >
            RECEIVING WALLET ADDRESS (ETH MAINNET)
          </label>
          <textarea
            style={{ resize: "none", overflow: "hidden" }}
            id="wallet_address"
            type="text"
            className={`w-[345px] md:w-[585px] h-[54px] md:h-[62px] pl-[40px] pr-[40px] md:pr-0  py-[12px] md:py-[14px] rounded-[20px] bg-white cactus-text-color font-poppins text-[12px] md:text-base font-black placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${
              errors?.wallet_address?.message
                ? "outline-none ring-1 ring-red-500 border-transparent"
                : "input-border"
            }`}
            {...register("wallet_address", {
              required: "Wallet address is required",
              validate: validateWalletAddress,
            })}
            name="wallet_address"
            required
          />
          <p className=" text-danger italic pl-[40px] pt-3">
            {errors.wallet_address?.message}
          </p>
        </div>
        <div className="relative flex-col mt-[24px] w-full flex justify-center items-center">
          <label
            htmlFor="withdraw_amount"
            className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase self-start  w-[345px] md:w-[585px] "
          >
            withdraw amount
          </label>
          <div className="relative ">
            <input
              type="withdraw_amount"
              className={`w-[345px] md:w-[585px] h-[54px] md:h-[62px] pl-[40px]  py-[12px] md:py-[14px] rounded-[20px] bg-white cactus-text-color font-poppins text-[16px] font-black uppercase placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${
                errors.withdraw_amount?.message
                  ? "outline-none ring-1 ring-red-500 border-transparent"
                  : "input-border"
              }`}
              {...register("withdraw_amount", {
                min: {
                  value: selectedCurrency === "ETH" ? 0.015 : 10,
                  message:
                    selectedCurrency === "ETH"
                      ? " Minimum withdrawal amount is 0.015 ETH"
                      : selectedCurrency === "USDT"
                      ? " Minimum withdrawal amount is 10 USDT"
                      : selectedCurrency === "USDC"
                      ? " Minimum withdrawal amount is 10 USDC"
                      : "",
                },
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "Not a valid amount",
                },
                required: "Not a valid amount",
              })}
              name="withdraw_amount"
              required
            />
            <span
              className={`block absolute ${
                selectedCurrency === "ETH" ? "right-14" : "right-20"
              }  top-0 bg-[#5E3D1C] w-[1px] h-full`}
            ></span>
            <span className="block absolute right-4 top-1/2 -translate-y-1/2 font-poppins font-semibold text-[#5E3D1C]">
              {selectedCurrency}
            </span>
          </div>
          {errors?.withdraw_amount?.message && (
            <p className="text-danger italic pl-[40px] pt-3 self-start w-[345px] md:w-[585px] h-[54px]">
              {Array.isArray(errors.withdraw_amount.message)
                ? errors.withdraw_amount.message.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : errors.withdraw_amount.message}
            </p>
          )}
          {errMsg && (
            <div className="text-danger italic pl-[40px] pt-3 self-start w-[345px] md:w-[585px] h-[54px]">
              <p className="">{errMsg}</p>
            </div>
          )}
        </div>

        <div className="pl-[20px] md:pl-[40px] mt-[40px] md:mt-[52px] font-IBM text-base font-normal w-[345px] md:w-[585px]">
          {selectedCurrency === "ETH" && (
            <ul className="list-disc space-y-[20px]">
              <li>Minimum withdrawal amount is 0.015 ETH</li>
              <li>
                ETH withdrawals are processed after 3 network confirmations
              </li>
              <li>
                ETH will be deducted from the Withdrawal Amount to cover the
                network fee
              </li>
            </ul>
          )}

          {selectedCurrency === "USDC" && (
            <ul className="list-disc space-y-[20px]">
              <li>Minimum withdrawal amount is 10 USDC</li>
              <li>
                USDC withdrawals are processed after 3 network confirmations
              </li>
              <li>
                USDC will be deducted from the Withdrawal Amount to cover the
                network fee
              </li>
            </ul>
          )}

          {selectedCurrency === "USDT" && (
            <ul className="list-disc space-y-[20px]">
              <li>Minimum withdrawal amount is 10 USDT</li>
              <li>
                USDT withdrawals are processed after 3 network confirmations
              </li>
              <li>
                USDT will be deducted from the Withdrawal Amount to cover the
                network fee
              </li>
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={errors?.wallet_address || errors?.withdraw_amount}
          className={` ${
            formState?.isValid ? "hero-button text-white" : "bg-submit-button"
          } rounded-full w-[345px] md:w-[388px] h-[63px] text-s-button-text font-poppins font-bold  text-[20px] uppercase mt-[40px] md:mt-[52px] flex justify-center items-center self-center`}
        >
          {loading ? (
            <Spinner />
          ) : (
            <span className="inline-block">Withdraw Funds</span>
          )}
        </button>
      </form>
      <UiModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="px-[12px] md:px-[127px] w-[345px] md:w-[690px] justify-center text-center">
          <img src={ModalImg} className="mx-auto" alt="Modal image" />
          <div className="w-[321px] md:w-[453px] text-center">
            <h1 className="text-2xl font-rubik text-primary-title mt-[28px] uppercase">
              Withdrawal Submitted
            </h1>
            <p className="text-stone-950 text-opacity-50">
              You can check the progress on the{" "}
              <span
                className="text-[#18BD8980]/50 underline underline-offset-3 cursor-pointer"
                onClick={() => {
                  setCurrentForm("history");
                  closeModal();
                }}
              >
                {" "}
                History Page
              </span>
            </p>
          </div>
          <UiButton
            label="OK"
            onClose={closeModal}
            classes="w-[321px] md:!w-[453px] !h-[64px] mt-[30px] mb-[56px]"
          />
        </div>
      </UiModal>
      <div className="w-full bg-withdraw-lg hidden md:block h-[544px] bg-cover bg-no-repeat absolute left-0 bottom-0 -z-[1]"></div>
      <div className="w-full bg-withdraw-sm md:hidden block h-[148px] bg-cover bg-no-repeat absolute left-0 bottom-0 -z-[1]"></div>
    </div>
  );
};

export default WithDrawForm