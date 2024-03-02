import React from "react";

export default function VerifyData() {
  return (
    <div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Server Seed
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              ioKGgsohsvusmgkHGaCk8C2BIOLLuTBrTMLKopa8
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          client seed
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              IyJ6K7T0L2zxamQb2oEmVrnWNJuOrfHA
            </p>
          </div>
        </div>
      </div>
      <h4 className="text-[#5E3D1C] font-poppins text-[20px] font-bold uppercase pt-[50px]">
        step 0
      </h4>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Server seed + step + client seed
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden  font-poppins font-normal"
            >
              ioKGgsohsvusmgkHGaCk8C2BIOLLuTBrTMLKopa80IyJ6K7T0L2zxamQb2oEmVrnWNJuOrfHA
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          sha512 server seed + step + client seed
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden  font-poppins font-normal"
            >
              063665672557fe48d579a1e7fb34142d8912f1e52f34de55029cfa3b5d9615c7d43302352b40a
              e89d68fa2b0079a8a52d99124f5adaa48370aaf396814cca329
            </p>
          </div>
        </div>
      </div>

      {/* data table */}
      <table className="w-full mt-[20px]">
        <thead>
          <tr className="">
            <th className="text-[#5E3D1C] pb-[12px] text-center font-poppins text-[12px] font-bold uppercase">
              Hash part
            </th>
            <th className="text-[#5E3D1C] pb-[12px] text-center font-poppins text-[12px] font-bold uppercase">
              Number
            </th>
            <th className="text-[#5E3D1C] pb-[12px] text-center font-poppins text-[12px] font-bold uppercase">
              Field
            </th>
            <th className="text-[#5E3D1C] pb-[12px] text-center font-poppins text-[12px] font-bold uppercase">
              New field
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#F5AA52]">
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              44
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              32
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              13
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              13
            </td>
          </tr>
          <tr className="">
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              44
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              32
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              13
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              13
            </td>
          </tr>
          <tr className="bg-[#F5AA52]">
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              44
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              32
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              13
            </td>
            <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
              13
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
