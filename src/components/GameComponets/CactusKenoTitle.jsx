import React from 'react';
import cactusLogo from "./../../assets/image/cactus.png";
import { useGlobalContext } from '../../context/context';
import UiModal from '../Ui/UiModal';
import { useState } from 'react';
 import ModalImg from "./../../assets/image/modalImg.png";

const CactusKenoTitle = () => {
    const { isLoggedIn } = useGlobalContext();
     const [isModalOpen, setModalOpen] = useState(false);
     const closeModal = () => {
       setModalOpen(false);
     };

      
    return (
      <div className="flex flex-wrap pt-[17px] mx-8 md:mx-0 gap-0 md:gap-4 justify-center md:justify-start">
        <div className="flex justify-center items-center">
          <img
            src={cactusLogo}
            className="md:pl-[34px] h-8 md:h-[50px]"
            alt="cactus logo"
          />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-white text-2xl md:text-5xl font-normal font-rubik uppercase leading-[52.80px] shadow-text">
            cactus Keno
          </h1>
        </div>
        <div className="flex justify-center items-center mx-auto md:mx-0 gap-4">
          {isLoggedIn ? (
            <h3 className="text-white  cursor-pointer uppercase font-bold text-[18px] font-poppins">
              Balance: <span className="underline">1,000,000 credits</span>
            </h3>
          ) : (
            <>
              <h3
                onClick={() => setModalOpen(true)}
                className="text-white underline cursor-pointer"
              >
                How To Play
              </h3>
              <div className="text-white">I</div>
              <h3
                onClick={() => setModalOpen(true)}
                className="text-white underline cursor-pointer"
              >
                Provably Fair
              </h3>
            </>
          )}
        </div>
        <UiModal isOpen={isModalOpen} onClose={closeModal} close={true}>
          <div className="px-[12px] md:px-[127px] w-[345px] md:w-[690px] justify-center text-center">
            <img src={ModalImg} className="mx-auto" alt="Modal image" />
            <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat optio, quis magni hic cupiditate! Ullam neque tempora odit, commodi doloribus expedita nulla sunt! Nemo, vero earum? Architecto, tempora quia?
            </p>
          </div>
        </UiModal>
      </div>
    );
};

export default CactusKenoTitle;