const InputField = ({ label, type, error }) => {
  return (
    <div className="relative flex flex-col mt-[24px]">
      <label
        htmlFor={label}
        className="cactus-text-color text-[12px] pb-[12px] font-bold font-poppins uppercase"
      >
        {label}
      </label>
      <input
        type={type}
        className={`w-full md:w-[585px] height-[62px] px-[23px] md:px-[40px] py-[12px] md:py-[14px] rounded-[20px] bg-white input-border cactus-text-color font-poppins text-[16px] font-black uppercase placeholder:text-primary-title focus:outline-none focus:ring-1 focus:ring-[#F5AA52] focus:border-transparent ${
          error ? " border-red-500" : ""
        }`}
        name={type}
      />
    </div>
  );
};

export default InputField;
