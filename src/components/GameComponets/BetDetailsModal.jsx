import { useState } from "react";
import UiButton from "../Ui/UiButton";
import InfoData from "./InfoData";
import VerifyData from "./VerifyData";

export default function BetDetailsModal({ data, historyVerify }) {
  const [selectType, setSelectType] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);


  const closeModal = () => {
    setIsOpenModal(false);
  }
  return (
    <div className="px-[12px] md:px-[50px] w-[345px] md:w-[900px]">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-[#5E3D1C] font-rubik text-[24px] font-normal uppercase">
          Keno bet {data.BetID}
        </h1>
        <div className="flex justify-center items-center mt-[20px]">
          <button
            className={`${selectType === 0 ? "text-[#FFF] bg-[#F9A048]" : "text-[#F9A048] bg-[#FFF]"} info_btn mr-[8px] font-poppins text-[12px] font-bold uppercase w-[106.94px] py-[10px] px-[15px] flex items-center justify-center rounded-[6px]`}
            onClick={() => setSelectType(0)}
          >
            Info
          </button>
          <button
            className={`${selectType === 1 ? "text-[#FFF] bg-[#F9A048]" : "text-[#F9A048] bg-[#FFF]"} verify_btn font-poppins text-[12px] font-bold uppercase w-[106.94px] py-[10px] px-[15px] flex items-center justify-center rounded-[6px]`}
            onClick={() => setSelectType(1)}
          >
            Verify
          </button>
        </div>
      </div>
      {selectType === 0 ? <InfoData data={data} /> : <VerifyData data={historyVerify} />}
 
    </div>
  );
}
