import react from 'react'
import useSWR from 'swr';
import { getWinners } from '../ApiFetcher/fetcher';
import { formatDateTime } from '../utilities/utilitiesFunction';


const RecentWinner = () => {

  const { data, error, isLoading, } = useSWR("winner", getWinners, { refreshInterval: 5000 })
  console.log("data", data);





  return (
    <section className="py-[48px] lg:pt-[84px] lg:pb-[95px] px-[5px] lg:px-[145px] bg-[#FFF5EB]">
      <div className="container">
        <h1 className="lg:text-center font-rubik lg:text-6xl text-primary-title md:text-[32px] md:text-center text-[32px] text-center uppercase mb-3">
          Recent Winners
        </h1>
        <table className="w-full ">
          <thead>
            <tr>
              <th className="text-center p-[5px] font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] md:px-[56px]">
                Time
              </th>
              <th className="text-start p-[5px] font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] md:px-[56px]">
                keno
              </th>
              <th className="text-start p-[5px] font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] md:px-[56px]">
                somebody
              </th>
              <th className="text-start p-[5px] font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] md:px-[56px]">
                Bet
              </th>
              <th className="text-center p-[5px] font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] md:px-[56px]">
                Win
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.records?.map((el, index) => (
              <tr key={index} className="table-row">
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } rounded-l-full`}
                >
                  <div className="flex justify-between">
                    {formatDateTime(el?.Time)} <div className="td-broder"></div>
                  </div>
                </td>
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } border-primary-title`}
                >
                  <div className="flex justify-between">
                    {el?.Game}
                    <div className="td-broder"></div>
                  </div>
                </td>
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } border-primary-title`}
                >
                  <div className="flex justify-between">
                    {el?.SomeBody}
                    <div className="td-broder"></div>
                  </div>
                </td>
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } border-primary-title`}
                >
                  <div className="flex justify-between">
                    {el?.Bet}
                    <div className="td-broder"></div>
                  </div>
                </td>
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] p-[20px] md:px-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } rounded-r-full`}
                >
                  {el?.Win}
                </td>
              </tr>
            ))}

            {/* <tr className="table-row">
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  rounded-l-full">
                <div className="flex justify-between">
                  2023/04/14 14:58 <div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  border-primary-title">
                <div className="flex justify-between">
                  keno<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]   ">
                <div className="flex justify-between">
                  somebody<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]   ">
                <div className="flex justify-between">
                  0.1<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] p-[20px] md:px-[56px]  rounded-r-full">
                  0.2
              </td>
            </tr>
            <tr className="table-row">
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] bg-orange-primary rounded-l-full">
                <div className="flex justify-between">
                  2023/04/14 14:58 <div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] bg-orange-primary border-primary-title">
                <div className="flex justify-between">
                  keno<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  bg-orange-primary ">
                <div className="flex justify-between">
                  somebody<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  bg-orange-primary ">
                <div className="flex justify-between">
                  0.1<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] p-[20px] md:px-[56px] bg-orange-primary rounded-r-full">
                  0.2
              </td>
            </tr>
            <tr className="table-row">
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  rounded-l-full">
                <div className="flex justify-between">
                  2023/04/14 14:58 <div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  border-primary-title">
                <div className="flex justify-between">
                  keno<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]   ">
                <div className="flex justify-between">
                  somebody<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]   ">
                <div className="flex justify-between">
                  0.1<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] p-[20px] md:px-[56px]  rounded-r-full">
                  0.2
              </td>
            </tr>
            <tr className="table-row">
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] bg-orange-primary rounded-l-full">
                <div className="flex justify-between">
                  2023/04/14 14:58 <div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px] bg-orange-primary border-primary-title">
                <div className="flex justify-between">
                  keno<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  bg-orange-primary ">
                <div className="flex justify-between">
                  somebody<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  bg-orange-primary ">
                <div className="flex justify-between">
                  0.1<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] p-[20px] md:px-[56px] bg-orange-primary rounded-r-full">
                  0.2
              </td>
            </tr>
            <tr className="table-row">
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  rounded-l-full">
                <div className="flex justify-between">
                  2023/04/14 14:58 <div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]  border-primary-title">
                <div className="flex justify-between">
                  keno<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]   ">
                <div className="flex justify-between">
                  somebody<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] lg:pl-[56px]   ">
                <div className="flex justify-between">
                  0.1<div className="td-broder"></div>
                </div>
              </td>
              <td className="text-center font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] p-[20px] md:px-[56px]  rounded-r-full">
                  0.2
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentWinner;
