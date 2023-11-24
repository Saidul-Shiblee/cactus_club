import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "../../assets/data/local.db";
import Logo from "/CactusClub.png";
import barIcon from "../../assets/icons/ion_menu.svg";
import xIcon from "../../assets/icons/x.png";
import RightIcon from "../../assets/icons/chevron-right.svg"
import UiButton from "../Ui/UiButton";
import AvartarDropdown from "../Ui/AvartarDropdown";
import { useGlobalContext } from "../../context/context";
import useSWR from "swr";
import { getPlayerBalance } from "../../ApiFetcher/fetcher";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, } = useGlobalContext();
  const {data} = useSWR("balance", getPlayerBalance);
  console.log(data)
  return (
    <nav
      className={`bg-white relative z-[3] ${
        location.pathname.toLowerCase() === "/faq" ? "nav-shadow" : ""
      }`}
    >
      <div className="flex flex-row justify-between h-[78px] items-center px-[15px] xl:px-[145px] lg:px-[50px] md:px-[20px]">
        <div className="flex justify-between items-center md:block">
          <Link to="/">
            <img src={Logo} className=" w-3/4 md:w-full" alt="cactus-logo" />
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="flex gap-4 md:hidden">
            <div>
              <button className="hero-button font-poppins text-[12px] font-bold uppercase text-white flex items-center justify-center px-3 w-full h-[33px] ">
                <span className="h-min inline-block">Deposit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="h-min mt-[6px] ml-2"
                >
                  <path
                    d="M9.5 8V2.82843C9.5 1.04662 7.34572 0.154284 6.08579 1.41421L0.914215 6.58578C-0.345714 7.84571 0.546618 10 2.32843 10H7.5C8.60457 10 9.5 9.10457 9.5 8Z"
                    fill="#FFD55A"
                  />
                </svg>
              </button>
            </div>
            <div className=" mt-[2px] md:mt-0">
              <AvartarDropdown classes="w-[375px] right-0 " />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden button__custom w-[44px] h-[44px]"
          >
            <img
              className="mx-auto hover:bg-primary-hover"
              src={!menuOpen ? barIcon : xIcon}
              alt="My SVG"
            />
          </button>
        )}

        <ul className="hidden md:flex md:items-center justify-between flex-col md:flex-row py-[12px] md:py-0">
          {NavItem.map(({ id, label, href }) => (
            <li key={id} className="mr-[24px] py-[5px] md:py-0">
              <Link
                className="font-poppins text-[14px] font-semibold text-link uppercase tracking-[2px]"
                to={href}
              >
                {label}
              </Link>
            </li>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center">
              <div>
                <UiButton
                  label="Deposite & Play "
                  classes={`!h-[43px] md:!w-[197px] !text-[14px] ${location.pathname.toLowerCase()==="/deposite"? "hidden": "block"}`}
                  svgMargin={true}
                />
                <UiButton
                  label={`BALANCE: ${data?.data?.ETHER} ETH`}
                  classes={`!h-[43px] md:!w-[197px] !text-[14px] ${location.pathname.toLowerCase()==="/deposite"? "block": "hidden"}`}
                  svgMargin={true}
                />
              </div>
              <div className="ml-8 flex items-center mt-2">
                <AvartarDropdown />
              </div>
            </div>
          ) : (
            <div className="flex">
              <li className="lg:ml-[24px] md:ml-[12px] py-[12px] md:py-0">
                <Link
                  to="/login"
                  className="button__custom text-white font-poppins text-[14px] font-semibold uppercase py-[10px] px-[12px]"
                >
                  log in
                </Link>
              </li>
              <li className="md:pl-[8px] py-[12px] md:py-0">
                <Link
                  to="/sign-up"
                  className="button__custom text-white font-poppins text-[14px] font-semibold  uppercase py-[10px] px-[12px]"
                >
                  sign up
                </Link>
              </li>
            </div>
          )}
        </ul>

        {/* mobile menu */}
        {menuOpen ? (
          <ul className="flex absolute top-[100%] bg-white left-0 right-0 md:hidden justify-between flex-col md:flex-row py-[12px] md:py-0 rounded-b-[30px] px-[20px]">
            <div className="pb-[20px]">
              <h2 className="text-[24px] uppercase text-primary-title font-rubik ml-[20px] ">
                menu
              </h2>
            </div>

            {NavItem.map(({ id, label, href }) => (
              <li key={id} className="mr-[24px] ml-[20px] py-[5px] md:py-0">
                <Link
                  className="font-poppins text-[14px] font-semibold text-link uppercase tracking-[2px] flex justify-between pb-[16px]"
                  to={href}
                >
                  {label} <img src={RightIcon} alt="icon" />
                </Link>
              </li>
            ))}
            <li className="lg:ml-[24px] mb-2 mx-[20px] button__custom md:ml-[12px] py-[12px] md:py-0">
              <Link
                to="/login"
                className=" text-white font-poppins text-[14px] font-semibold uppercase py-[10px] px-[12px]"
              >
                log in
              </Link>
            </li>
            <li className="md:pl-[8px] mx-[20px] mb-[45px] button__custom py-[12px] md:py-0">
              <Link
                to="/sign-up"
                className=" text-white font-poppins text-[14px] font-semibold  uppercase py-[10px] px-[12px]"
              >
                sign up
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
