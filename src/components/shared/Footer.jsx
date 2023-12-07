// import React from 'react';
import footerImage from "./../../assets/image/cactus_long1.png";
// import UiButton from '../Ui/UiButton';
import { NavItem } from "../../assets/data/local.db";
import { Link } from "react-router-dom";
import facebookIcon from "./../../assets/image/logos/SocialMediaLogo.svg";
import Icon2 from "./../../assets/image/logos/SocialMediaLogo1.svg";
import Icon3 from "./../../assets/image/logos/SocialMediaLogo2.svg";
import UiButton from "../Ui/UiButton";
 import { useLocation } from "react-router-dom";
 import ModalImg from "../../assets/image/modalImg.png";
import { useState } from "react";
import UiModal from "../Ui/UiModal";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
   const location = useLocation();
     const closeModal = () => {
       setModalOpen(false);
     };
  return (
    <footer className="footer-bg">
      <div className="container px-[15px] md:px-[60px] lg:px-[120px] pt-[73px] pb-[24px]">
        <div className="flex items-center lg:justify-between flex-col md:flex-row md:justify-center gap-[50px]">
          <img src={footerImage} alt="footer image" />

          <div className="flex justify-center items-center xl:justify-between flex-col xl:flex-row flex-1  xl:items-start md:gap-4 xl:gap-[107px]">
            <div>
              <p className=" text-center xl:text-start font-poppins text-[18px] font-normal   ">
                Subscribe to our newsletter to get all the insights on crypto
                and gaming. We’ll also keep you up to date on the latest
                releases and promotions at the Cactus Club!
              </p>
            </div>

            <div className=" grow" onClick={() => setModalOpen(true)}>
              <UiButton
                label="subscribe"
                classes="px-12 my-[48px] md:my-0 md:px-0"
              />
            </div>
          </div>
        </div>

        {location.pathname.toLowerCase() === "/faq" && (
          <div className="w-full flex flex-col md:hidden items-start gap-2 border-b border-lime-900 border-opacity-20 mt-[38px] mb-[70px]">
            <h6 className="text-[#5E3D1C] text-xs uppercase font-bold">
              Subscribe to our updates Copy
            </h6>
            <div className="w-full h-[67px] relative mb-[48px]">
              <input
                className="pl-6 py-6 font-bold text-base font-poppins uppercase text-[#5E3D1C]/40 h-full w-full border border-white/30 bg-white/20 rounded-xl focus:border-white/50 focus:border-[1px]  focus:outline-none 
            "
              ></input>
              <button
                style={{ borderRadius: "12px" }}
                className={`hero-button absolute   text-white     h-[63px]  w-[70px] top-0 right-0 flex justify-center items-center`}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.3307 2.66602L14.6641 17.3327"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29.3307 2.66602L19.9974 29.3327L14.6641 17.3327L2.66406 11.9993L29.3307 2.66602Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between flex-col md:flex-row mt-0 md:mt-[55px] border-lime-900 border-b border-opacity-20">
          <h3 className="font-luckiest uppercase text-3xl font-normal text-center text-green-700">
            Cactus Club
          </h3>
          <div className="md:hidden  flex justify-center pt-[24px] pb-[45px]">
            <img src={facebookIcon} className="cursor-pointer" alt="Icon" />
            <img
              src={Icon2}
              className="cursor-pointer px-[13.42px]"
              alt="Icon"
            />
            <img src={Icon3} className="cursor-pointer " alt="Icon" />
          </div>

          <div className="flex lg:justify-between md:jsutify-center flex-col md:flex-row">
            {NavItem.map((item, index) => (
              <div
                key={item.label}
                className=" border-lime-900 border-opacity-20 lg:border-0 md:border-b text-center py-3 md:ml-3  md:block flex flex-col justify-center items-center"
              >
                <Link
                  key={item.label}
                  className=" md:ml-3 uppercase font-poppins font-semibold text-stone-800 text-center mb-4  inline-block md:inline"
                  to={item.href}
                >
                  {item.label}
                </Link>

                {index === NavItem?.length - 1 ? null : (
                  <div className="block md:hidden border-separate border-b border-lime-900 border-opacity-20 lg:border-0 md:border-b text-center md:ml-3 mx-32 w-[38px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between flex-col md:flex-row mt-[22px]">
          <div className="block mx-auto md:mx-0">
            <Link
              className=" text-lime-950 font-poppins lg:ml-0 md:ml-[20px] mr-[30px] md:mr-[84px]"
              to={"/privacy-policy"}
            >
              Privacy Policy
            </Link>
            <Link
              className=" text-lime-950 mr-[20px] font-poppins"
              to={"/terms-conditions"}
            >
              Terms Of Service
            </Link>
          </div>
          <div className="md:flex sm:hidden hidden">
            <img src={facebookIcon} className="cursor-pointer" alt="Icon" />
            <img
              src={Icon2}
              className="cursor-pointer px-[13.42px]"
              alt="Icon"
            />
            <img src={Icon3} className="cursor-pointer " alt="Icon" />
          </div>
        </div>
      </div>

      <UiModal isOpen={isModalOpen} onClose={closeModal} close={true}>
        <div className="px-[12px] md:px-[127px] w-[345px] md:w-[690px] justify-center text-center">
          <img src={ModalImg} className="mx-auto" alt="Modal image" />
          <div className="w-[321px] md:w-[453px] text-center">
            <h1 className="text-2xl font-rubik text-primary-title mt-[28px] uppercase">
              Subscribe to our newsletter
            </h1>
            <p className="text-stone-950 text-opacity-50">
              Receive new articles and resources directly on your inbox. Fill
              your email below to join our email newsletter today.
            </p>
          </div>
          <input
            type="email"
            required
            className={`mt-[30px] h-[64px] w-[321px] md:w-[453px] py-[12px]  rounded-full bg-[#F5AA52] pl-[32px]
             cactus-text-color font-poppins text-[16px] font-black uppercase placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent `}
            name="password"
            placeholder="Enter Your Email"
          />
          <UiButton
            label="SUBSCRIBE"
            onClose={closeModal}
            classes="w-[321px] md:!w-[453px] !h-[64px] mt-[12px] mb-[56px]"
          />
        </div>
      </UiModal>
    </footer>
  );
};

export default Footer;
