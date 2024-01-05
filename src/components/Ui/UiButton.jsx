import React from "react";

const UiButton = ({ label, classes = "", svgMargin,onClick=undefined, onClose=undefined }) => {
  return (
    <button
      onClick={onClick || onClose}
      className={`hero-button font-poppins text-[20px] font-bold uppercase text-white flex items-center justify-center gap-2 md:w-[294px] w-full h-[63px] ${classes}`}
    >
      <span className="h-min inline-block">{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        className={`h-min ${svgMargin ? "mt-[2px]" : "mt-[6px]"}`}
      >
        <path
          d="M9.5 8V2.82843C9.5 1.04662 7.34572 0.154284 6.08579 1.41421L0.914215 6.58578C-0.345714 7.84571 0.546618 10 2.32843 10H7.5C8.60457 10 9.5 9.10457 9.5 8Z"
          fill="#FFD55A"
        />
      </svg>
    </button>
  );
};

export default UiButton;
