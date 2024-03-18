import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../../ApiFetcher/fetcher';
import { useGlobalContext } from '../../context/context';
import UiButton from '../Ui/UiButton';
import UiModal from '../Ui/UiModal';
import cactusLogo from "./../../assets/image/cactus.png";
import ProbablyFairPolicy from './ProbablyFairPolicy';
import HowToPlayKenoGames from './HowToPlayKenoGames';
const CactusKenoTitle = () => {
  const { isLoggedIn, authToken } = useGlobalContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHowToPlayModalOpen, setHowToPlayModalOpen] = useState(false);
  const [provablyData, setProvablyData] = useState();
  const [nextClientSeed, setNextClientSeed] = useState('');
  const [customeSeedField, setCustomSeedField] = useState(false);
  const [customeSeedInputValue, setCustomeSeedInputValue] = useState("");
  const [error, setError] = useState(null);
  const [lastClientSeed, setLastClientSeed] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [lastServerSeedSHA256, setLastServerSeedSHA256] = useState('');
  const [nextServerSeedSHA256, setNextServerSeedSHA256] = useState('');
  const closeModal = () => {
    setModalOpen(false);
    setHowToPlayModalOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const textTwoLines = (text) => {
    if (!text) {
      return ['', ''];
    }
    if (isSmallScreen) {
      if (text.indexOf(' ') === -1) {
        const halfIndex = Math.ceil(text.length / 1.5);
        const firstLine = text.slice(0, halfIndex);
        const secondLine = text.slice(halfIndex);
        return [firstLine, secondLine];
      }
    }
    const words = text.split(' ');
    const halfIndex = Math.ceil(words?.length / 2);
    const firstLine = words.slice(0, halfIndex).join(' ');
    const secondLine = words.slice(halfIndex).join(' ');
    return [firstLine, secondLine];
  };
  const [lastServerSeedLine1, lastServerSeedLine2] = textTwoLines(lastServerSeedSHA256);
  const [nextServerSeedLine1, nextServerSeedLine2] = textTwoLines(nextServerSeedSHA256);
  const handleChange = (event) => {
    const { value } = event.target;
    setCustomeSeedInputValue(value);
    if (/^[a-zA-Z0-9]{40}$/.test(value)) {
      setNextClientSeed(value);
      setError(null);
    } else {
      setError("Input must be a 40-character string with capital letters, small letters, and numbers.");
    }
  };
  const generateNextClientSeed = () => {
    const getLastSeed = localStorage.getItem("cactus_next_client_seed")
    localStorage.setItem("cactus_last_client_seed", getLastSeed);
    setLastClientSeed(getLastSeed);
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    const length = 40;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setNextClientSeed(result);
    setCustomeSeedInputValue(result);
    localStorage.setItem("cactus_next_client_seed", result);
  };
  const provablyFairData = async () => {
    try {
      const res = await axios.get(`${URL}/getProvablyFair`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": authToken,
        }
      }
      );
      if (!lastClientSeed) {
        setLastClientSeed(res?.data?.data?.LastClientSeed)
      }
      localStorage.setItem("cactus_last_client_seed", res?.data?.data?.LastClientSeed)
      setProvablyData(res.data);
      setLastServerSeedSHA256(res.data?.data?.LastServerSeedSHA256);
      setNextServerSeedSHA256(res.data?.data?.NextServerSeedSHA256)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    provablyFairData()
    const nextClient = localStorage.getItem("cactus_next_client_seed")
    if (!nextClient) {
      generateNextClientSeed()
    } else {
      setNextClientSeed(nextClient)
    }
  }, [!provablyData])
  const handleCheckboxChange = () => {
    setCustomSeedField(!customeSeedField);
  };
  const handleCustomeSeedUpdate = () => {
    if (!error) {
      localStorage.setItem("cactus_next_client_seed", customeSeedInputValue);
      setCustomSeedField(false)
      closeModal()
    }
  }
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
        
        <h3
          onClick={() => setHowToPlayModalOpen(true)}
          className="text-white underline cursor-pointer font-bold"
        >
          How To Play
        </h3>
        <div className="text-white">I</div>
        <h3
          onClick={() => setModalOpen(true)}
          className="text-white underline cursor-pointer font-bold"
        >
          Provably Fair
        </h3>
      </div>

      {/* Provably fair modal  */}
      <div>
        <UiModal isOpen={isModalOpen} onClose={closeModal} close={true}>
          <div className="px-[12px] md:px-[50px] w-[345px] md:w-[900px]">
            <h2 className=' text-primary-title font-rubik text-[24px] font-normal uppercase pb-3 text-center'>Understanding our Provably Fair system</h2>
            <p className=' font-IBM text-base text-[#0E0E0E80]'>
              At Cactus Club, we're proud to offer a cutting-edge Provably Fair system in our crypto gambling games. This advanced technology is a testament to our commitment to fairness and transparency, ensuring that every game you play is beyond reproach.
            </p>
            <div>
              <div>
                <p className=' font-poppins text-primary-title font-bold text-xs my-2 mt-4 uppercase'>Last server seed sha256</p>
                <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
                  <div className="flex items-center">
                    <p
                      id="deposite"
                      className="md:w-full rounded-[20px] bg-orange-primary px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden "
                    > {lastServerSeedLine1}{lastServerSeedLine2 && <br className="sm:hidden" />} {lastServerSeedLine2}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className=' font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase'>last server seed</p>
                <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
                  <div className="flex items-center">
                    <p
                      id="deposite"
                      className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden "
                    > {provablyData?.data?.LastServerSeed}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className=' font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase'>last client seed</p>
                <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
                  <div className="flex items-center">
                    <p
                      id="deposite"
                      className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden "
                    > {lastClientSeed}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className=' font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase'>next server seed sha256</p>
                <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
                  <div className="flex items-center">
                    <p
                      id="deposite"
                      className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden "
                    > {nextServerSeedLine1}{nextServerSeedLine2 && <br className="sm:hidden" />} {nextServerSeedLine2}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className=' font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase'>next client seed</p>
                {
                  customeSeedField ?
                    <div className=" border-[1px] border-primary-title rounded-[20px] h-[54px] md:h-[72px] cactus-text-color font-poppins text-[10px] md:text-[16px] font-black  flex justify-between">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={customeSeedInputValue}
                          onChange={handleChange}
                          className="w-full md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] font-poppins text-[10px] md:text-[16px] font-black placeholder:text-primary-title border-none focus:outline-none cactus-text-color"
                          required
                        />
                        <p onClick={generateNextClientSeed} className=" text-primary-title font-bold text-base font-poppins underline capitalize right-4 cursor-pointer">randomize Client Seed</p>
                      </div>
                    </div>
                    :
                    <div className="md:relative rounded-[20px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[10px] md:text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex text-center">
                      <div className="flex items-center flex-wrap justify-end md:flex-nowrap md:justify-between">
                        <p
                          id="deposite"
                          className=" rounded-[20px] bg-orange-primary px-[20px] md:px-[40px] text-[10px] md:text-base "
                        > {nextClientSeed} </p>
                        <p onClick={generateNextClientSeed} className="md:absolute text-primary-title font-bold text-[10px] md:text-base font-poppins underline capitalize right-4 cursor-pointer px-4 md:px-0">randomize Client Seed</p>
                      </div>
                    </div>
                }
                <div className='flex gap-4 mt-2 pl-8'>
                  <input type="checkbox" checked={customeSeedField} onChange={handleCheckboxChange} className='checked:text-green-500 form-checkbox' />
                  <p className=' font-poppins text-primary-title'>I understand the risks of manually changing my client seed</p>
                </div>
                {
                  error != "" && customeSeedField ? <p className='text-center text-red-500'>{error}</p> : null
                }
              </div>
            </div>
            <ProbablyFairPolicy />
            {
              customeSeedField ?
                <div onClick={handleCustomeSeedUpdate} className='flex justify-center items-center my-6'>
                  <UiButton label={"OK"} />
                </div>
                :
                <div onClick={closeModal} className='flex justify-center items-center my-6'>
                  <UiButton label={"OK"} />
                </div>
            }
          </div>
        </UiModal>
      </div>
      {/* How To Play modal  */}
      <div>
        <UiModal isOpen={isHowToPlayModalOpen} onClose={closeModal} close={true}>
          <div className="px-[12px] md:px-[50px] w-[345px] md:w-[900px]">
            <h2 className=' text-primary-title font-rubik text-[24px] font-normal uppercase pb-3 text-center'>how to play cactus keno</h2>
            <p className=' font-IBM text-base text-[#0E0E0E80]'>
            Join the excitement of Cactus Club Keno, where your intuition could lead to fantastic rewards! Here's a simple guide on how to play:
            <br/>
            </p>
            <div>
             
            </div>
            <HowToPlayKenoGames />
            {
              customeSeedField ?
                <div onClick={handleCustomeSeedUpdate} className='flex justify-center items-center my-6'>
                  <UiButton label={"OK"} />
                </div>
                :
                <div onClick={closeModal} className='flex justify-center items-center my-6'>
                  <UiButton label={"OK"} />
                </div>
            }
          </div>
        </UiModal>
      </div>
    </div>
  );
};
export default CactusKenoTitle;