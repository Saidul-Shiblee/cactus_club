import React, { useEffect, useState } from "react";
import FAQ_Cactus from "../assets/icons/faq_cactus.svg";
import RightIcon from "../assets/icons/chevron-right.svg";

const FAQ = () => {
    const [show,setShow]=useState('')
  const faq = [
    {
      id: 1,
      que: "Lorem Ipsum dolor sit amet",
      ans: "Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi congue diam ut et odio. Duis sodales in sed nulla. Est enim amet vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing ultrices commodo velit. Tristique orci nullam habitasse tempor a scelerisque commodo. Sit quis enim proin netus neque porttitor mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.Massa egestas ante nulla urna vel neque. Adipiscing faucibus facilisis gravida sem. Mauris scelerisque cras quam id. Mollis egestas quis quis imperdiet posuere sagittis integer quis. Nisl penatibus tempus arcu sit urna cursus eget. Arcu elementum malesuada eros condimentum eget eros semper massa quisque.",
    },
    {
      id: 2,
      que: "Lorem Ipsum dolor sit amet",
      ans: "Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi congue diam ut et odio. Duis sodales in sed nulla. Est enim amet vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing ultrices commodo velit. Tristique orci nullam habitasse tempor a scelerisque commodo. Sit quis enim proin netus neque porttitor mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.Massa egestas ante nulla urna vel neque. Adipiscing faucibus facilisis gravida sem. Mauris scelerisque cras quam id. Mollis egestas quis quis imperdiet posuere sagittis integer quis. Nisl penatibus tempus arcu sit urna cursus eget. Arcu elementum malesuada eros condimentum eget eros semper massa quisque.",
    },
    {
      id: 3,
      que: "Lorem Ipsum dolor sit amet",
      ans: "Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi congue diam ut et odio. Duis sodales in sed nulla. Est enim amet vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing ultrices commodo velit. Tristique orci nullam habitasse tempor a scelerisque commodo. Sit quis enim proin netus neque porttitor mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.Massa egestas ante nulla urna vel neque. Adipiscing faucibus facilisis gravida sem. Mauris scelerisque cras quam id. Mollis egestas quis quis imperdiet posuere sagittis integer quis. Nisl penatibus tempus arcu sit urna cursus eget. Arcu elementum malesuada eros condimentum eget eros semper massa quisque.",
    },
    {
      id: 4,
      que: "Lorem Ipsum dolor sit amet",
      ans: "Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi congue diam ut et odio. Duis sodales in sed nulla. Est enim amet vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing ultrices commodo velit. Tristique orci nullam habitasse tempor a scelerisque commodo. Sit quis enim proin netus neque porttitor mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.Massa egestas ante nulla urna vel neque. Adipiscing faucibus facilisis gravida sem. Mauris scelerisque cras quam id. Mollis egestas quis quis imperdiet posuere sagittis integer quis. Nisl penatibus tempus arcu sit urna cursus eget. Arcu elementum malesuada eros condimentum eget eros semper massa quisque.",
    },
    {
      id: 5,
      que: "Lorem Ipsum dolor sit amet",
      ans: "Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi congue diam ut et odio. Duis sodales in sed nulla. Est enim amet vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing ultrices commodo velit. Tristique orci nullam habitasse tempor a scelerisque commodo. Sit quis enim proin netus neque porttitor mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.Massa egestas ante nulla urna vel neque. Adipiscing faucibus facilisis gravida sem. Mauris scelerisque cras quam id. Mollis egestas quis quis imperdiet posuere sagittis integer quis. Nisl penatibus tempus arcu sit urna cursus eget. Arcu elementum malesuada eros condimentum eget eros semper massa quisque.",
    },
    {
      id: 6,
      que: "Lorem Ipsum dolor sit amet",
      ans: "Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi congue diam ut et odio. Duis sodales in sed nulla. Est enim amet vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing ultrices commodo velit. Tristique orci nullam habitasse tempor a scelerisque commodo. Sit quis enim proin netus neque porttitor mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.Massa egestas ante nulla urna vel neque. Adipiscing faucibus facilisis gravida sem. Mauris scelerisque cras quam id. Mollis egestas quis quis imperdiet posuere sagittis integer quis. Nisl penatibus tempus arcu sit urna cursus eget. Arcu elementum malesuada eros condimentum eget eros semper massa quisque.",
    },
    {
      id: 7,
      que: "Lorem Ipsum dolor sit amet",
      ans: "Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi congue diam ut et odio. Duis sodales in sed nulla. Est enim amet vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing ultrices commodo velit. Tristique orci nullam habitasse tempor a scelerisque commodo. Sit quis enim proin netus neque porttitor mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.Massa egestas ante nulla urna vel neque. Adipiscing faucibus facilisis gravida sem. Mauris scelerisque cras quam id. Mollis egestas quis quis imperdiet posuere sagittis integer quis. Nisl penatibus tempus arcu sit urna cursus eget. Arcu elementum malesuada eros condimentum eget eros semper massa quisque.",
    },
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
              className="flex justify-between items-center p-6 text-lg font-semibold h-[70px]"
            >
              <p>Lorem Ipsum dolor sit amet</p>{" "}
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
                Lorem ipsum dolor sit amet consectetur. Gravida tempus morbi
                congue diam ut et odio. Duis sodales in sed nulla. Est enim amet
                vel sit enim nisi arcu. Amet nam amet ut id tempor adipiscing
                ultrices commodo velit. Tristique orci nullam habitasse tempor a
                scelerisque commodo. Sit quis enim proin netus neque porttitor
                mi bibendum. Cras sapien porta sagittis purus adipiscing tellus.
                Massa egestas ante nulla urna vel neque. Adipiscing faucibus
                facilisis gravida sem. Mauris scelerisque cras quam id. Mollis
                egestas quis quis imperdiet posuere sagittis integer quis. Nisl
                penatibus tempus arcu sit urna cursus eget. Arcu elementum
                malesuada eros condimentum eget eros semper massa quisque.
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
