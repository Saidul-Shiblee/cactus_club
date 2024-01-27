import CactusBG from "../assets/image/Rectangle282.png";
import CactusBGMid from "../assets/image/cactus_bg_images_mid.png";
import {Link} from "react-router-dom";

const CactusKeno = () => {
  return (
    <section className="relative max-w-[1920px] mx-auto xl:min-h-[614px] py-[95px] md:pt-[127px] md:pb-[159px]">
      <div className="">
        <div className="w-full md:w-[80%] xl:w-[400px] z-[2] pl-[5px] md:pl-[50px] xl:pl-0">
          <div className="mt-[20px] xl:pt-[147px] mb-[30px] xl:mb-0 xl:pl-[150px]">
            <div className="flex xl:block px-3 md:px-0 md:items-center sm:text-center flex-row gap-x-5">
              <h1 className="cactus-text-color font-rubik uppercase text-[32px] md:text-[60px] font-normal">
                cactus
              </h1>
              <h1 className="cactus-text-color font-rubik uppercase text-[32px] md:text-[60px] font-normal">
                Keno
              </h1>
            </div>
            <p className="text-[16px] px-3 md:px-0 font-normal font-IBM">
              Pick your lucky numbers and hold your breath as the results get
              revealed one at a time. Did you hit the hail Mary or get hung out
              to dry?!
            </p>
            <Link to={"/keno"}>
              <button className="hidden md:flex hero-button px-[18px] py-[18px] pl-[51px] pr-[64.5px] mt-[30px] md:mt-[40px] font-poppins text-[20px] font-bold uppercase text-white items-center">
                <span className="mr-[3.5px]">play now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="h-min mt-[6px]"
                >
                  <path
                    d="M9.5 8V2.82843C9.5 1.04662 7.34572 0.154284 6.08579 1.41421L0.914215 6.58578C-0.345714 7.84571 0.546618 10 2.32843 10H7.5C8.60457 10 9.5 9.10457 9.5 8Z"
                    fill="#FFD55A"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden xl:block absolute top-[127px]  right-0 w-[945px]">
          <img src={CactusBG} alt="asda" className="ml-[94px] w-auto" />
        </div>
        <div className="block xl:hidden w-[100%] pl-[5px] md:pl-[50px]">
          <img src={CactusBGMid} alt="asda" className="w-full" />
        </div>
        <button className="hero-button md:hidden w-[95%] p-[15px] mt-[30px] md:mt-[40px] font-poppins text-[20px] font-bold uppercase text-white flex items-center justify-center mx-[5px]">
          <span className="mr-[3.5px]">play now</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M9.5 8V2.82843C9.5 1.04662 7.34572 0.154284 6.08579 1.41421L0.914215 6.58578C-0.345714 7.84571 0.546618 10 2.32843 10H7.5C8.60457 10 9.5 9.10457 9.5 8Z"
              fill="#FFD55A"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CactusKeno;
