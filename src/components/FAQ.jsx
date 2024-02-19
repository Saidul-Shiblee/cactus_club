import React, { useEffect, useState } from "react";
import FAQ_Cactus from "../assets/icons/faq_cactus.svg";
import RightIcon from "../assets/icons/chevron-right.svg";

const FAQ = () => {
    const [show,setShow]=useState('')
  const faq = [
    {
      id: 1,
      que: "1. What is Cactus Club?",
      ans: "Cactus Club is an innovative online betting platform where you can play Keno using cryptocurrencies. We offer a seamless and secure betting experience for crypto enthusiasts.",
    },
    {
      id: 2,
      que: "2. Which cryptocurrencies do you support?",
      ans: "We currently support Ethereum (ETH), USD Coin (USDC), and Tether (USDT).",
    },
    {
      id: 3,
      que: "3. How do I sign up for Cactus Club? ",
      ans: "Signing up is easy! Just click on the 'Sign Up' button on our homepage and follow the instructions. You will need to provide a valid email address and create a secure password.",
    },
    {
      id: 4,
      que: "4. Why do I need to verify my email? ",
      ans: "Email verification is a crucial step to ensure the security of your account and to prevent any unauthorized access.",
    },
    {
      id: 5,
      que: "5. I didn't receive the verification email. What should I do? ",
      ans: "Please check your spam or junk folder. If you still can't find it, you can request another verification email from the login page or contact our support team for assistance.",
    },
    {
      id: 6,
      que: "6. How do I deposit cryptocurrencies into my account?",
      ans: "After logging in, navigate to the 'Deposit' section, select your preferred cryptocurrency, and follow the instructions to transfer funds from your crypto wallet to your Cactus Club account.",
    },
    {
      id: 7,
      que: "7. Are there any deposit fees? ",
      ans: "We do not charge any deposit fees. However, standard network fees for blockchain transactions apply.",
    },
    {
      id: 8,
      que: "8. How do I withdraw my winnings?",
      ans: "Go to the 'Withdraw' section in your account, choose the amount and the cryptocurrency, and follow the instructions to transfer your winnings to your crypto wallet.",
    },
    {
      id: 9,
      que: "9. How do I play Keno on Cactus Club? ",
      ans: "Once you've deposited funds, you can start playing Keno by selecting your numbers and placing your bet. The game rules and instructions are available on the Keno page.",
    },
    {
      id: 10,
      que: "10. Is there a minimum or maximum bet for Keno? ",
      ans: "Yes, each game of Keno has a minimum and maximum bet limit. These limits are displayed on the game screen.",
    },
    {
      id: 11,
      que: "11. Is Cactus Club secure? ",
      ans: "Absolutely! We use state-of-the-art security measures to protect your information and transactions.",
    },
    {
      id: 12,
      que: "12. How do you ensure fair play? ",
      ans: "Our Keno game uses a provably fair system, allowing you to verify each game's fairness independently.",
    },
    {
      id: 13,
      que: "13. I have a problem or question. How can I get help?",
      ans: "You can reach us through support@cactusclub.io. Please allow up to 24 hours for us to respond.",
    }
  ];

  const showContent = (e) => {
    if(e===show){
        setShow("")
        return
    }
    setShow(e)
  };

  return (
    <div className=" bg-[#FFF5EB] px-[15px] pb-[105px] md:px-[150px] md:pb-[150px] md:pt-[80px] pt-[54px] w-full flex flex-col justify-center items-center gap-[40px]  md:gap-[64px] relative">
      <h1 className="font font-rubik font-normal text-center uppercase text-[#5E3D1C] md:text-[60px] text-[32px]">
        frequency asked <br /> questions
      </h1>

      <div className="w-full flex flex-col gap-4    ">
        {faq.map((el) => (
          <div
            key={el.id}
            className="bg-white text-black font-IBM  w-full cs-shadow rounded-[20px] accordion-content"
          >
            <div
              onClick={() => showContent(el.id)}
              className="flex justify-between items-center p-6 text-lg font-semibold h-[70px] cursor-pointer"
            >
              <p>{el.que}</p>{" "}
              <img
                id={`img_${el.id}`}
                className={`w-4 h-4  ${
                  Number(show) === Number(el.id) ? "rotate-90" : " rotate-0"
                } `}
                src={RightIcon}
                alt="icon"
              />
            </div>

            <div
              id={el.id}
              className={`w-full px-6 pb-6 ${
                Number(show) === Number(el.id) ? "block" : "hidden"
              } `}
            >
              <p className="">
               {el.ans}
              </p>
            </div>
          </div>
        ))}
      </div>
      <img
        src={FAQ_Cactus}
        className="md:w-[141px] w-[118px] h-[106px] md:h-[127px] absolute -bottom-[1px] md:right-[109px] right-[15px]"
      />
    </div>
  );
};

export default FAQ;
