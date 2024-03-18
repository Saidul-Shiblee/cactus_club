import React, { useEffect, useState } from "react";

export default function VerifyData({ data }) {
  const [screenSize, setScreenSize] = useState('large');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 640) {
        setScreenSize('small');
      } else if (screenWidth <= 1024) { 
        setScreenSize('mid');
      } else {
        setScreenSize('large');
      }
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
    if (screenSize === "small") {
      if (text.indexOf(' ') === -1) {
        const halfIndex = Math.ceil(text.length / 1.7);
        const firstLine = text.slice(0, halfIndex);
        const secondLine = text.slice(halfIndex);
        return [firstLine, secondLine];
      }
    }
    if (screenSize === "large") {
      if (text.indexOf(' ') === -1) {
        const halfIndex = Math.ceil(text.length / 1.2);
        const firstLine = text.slice(0, halfIndex);
        const secondLine = text.slice(halfIndex);
        return [firstLine, secondLine];
      }
    }
    if (screenSize === "mid") {
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
  const sha51TextTwoLines = (text) => {
    if (!text) {
      return ['', ''];
    }
    if (screenSize === "small") {
      if (text.indexOf(' ') === -1) {
        const thirdIndex = Math.ceil(text.length / 3);
        const secondIndex = Math.ceil(text.length * (2 / 3));
        const firstLine = text.slice(0, thirdIndex);
        const secondLine = text.slice(thirdIndex, secondIndex);
        const thirdLine = text.slice(secondIndex);
        return [firstLine, secondLine, thirdLine];
      }
    }
    if (screenSize === "large") {
      if (text.indexOf(' ') === -1) {
        const halfIndex = Math.ceil(text.length / 1.5);
        const firstLine = text.slice(0, halfIndex);
        const secondLine = text.slice(halfIndex);
        return [firstLine, secondLine];
      }
    }
    if (screenSize === "mid") {
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

  const [sha51ServerSeedLine1, sha51ServerSeedLine2, sha51ServerSeedLine3] = sha51TextTwoLines(data.data.SHA512ServerSeedStepClientSeed);
  const [nextServerSeedLine1, nextServerSeedLine2] = textTwoLines(data.data.ServerSeedStepClientSeed);


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
              {data.data.ServerSeed}
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
              {data.data.ClinetSeed}
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
              {nextServerSeedLine1}{nextServerSeedLine2 && <br className="sm:hidden" />} {nextServerSeedLine2}
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
              {sha51ServerSeedLine1}{sha51ServerSeedLine2 && <br className="sm:hidden" />} {sha51ServerSeedLine3} {sha51ServerSeedLine2}
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
          {
            data.data.HashTable.map((hashData, index) =>
              <tbody key={hashData.Field}>
                <tr className={`${index %2 == 0 ? "bg-white": "bg-[#F5AA52]"}`}>
                  <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
                  {hashData.HashPart}
                  </td>
                  <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
                  {hashData.Number}
                  </td>
                  <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
                  {hashData.Field}
                  </td>
                  <td className=" text-[#5E3D1C] py-[11px] text-center font-poppins text-[12px] font-normal uppercase">
                    {hashData.NewField}
                    {/* {console.log(hashData)} */}
                  </td>
                </tr>
              </tbody>

            )
          }
      </table>
    </div>
  );
}
