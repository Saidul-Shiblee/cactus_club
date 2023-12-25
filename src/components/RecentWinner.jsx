import react from 'react'
import useSWR from 'swr';
import { getWinners } from '../ApiFetcher/fetcher';
import { formatDateTime } from '../utilities/utilitiesFunction';


const RecentWinner = () => {

  const { data, error, isLoading, } = useSWR("winner", getWinners, { refreshInterval: 5000 })





  return (
    <section className="py-[48px] max-w-[1920px] mx-auto lg:pt-[84px] lg:pb-[95px] px-[5px] lg:px-[145px] bg-[#FFF5EB]">
      <div className="container">
        <h1 className="lg:text-center font-rubik lg:text-6xl text-primary-title md:text-[32px] md:text-center text-[32px] text-center uppercase mb-3">
          Recent Winners
        </h1>
        <table className="w-full ">
          <thead>
            <tr>
              <th className="text-center flex justify-center items-center p-[5px] font-poppins font-semibold text-[10px] lg:text-[16px] uppercase table-font-color md:py-[20px] md:px-[56px]">
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
                  <div className="flex justify-between ml-[18px]">
                    {formatDateTime(el?.Time)} <div className="td-broder"></div>
                  </div>
                </td>
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] md:pl-[40px] lg:pl-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } border-primary-title`}
                >
                  <div className="flex justify-between ml-[5px]">
                    {el?.Game}
                    <div className="td-broder"></div>
                  </div>
                </td>
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] md:pl-[40px] lg:pl-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } border-primary-title`}
                >
                  <div className="flex justify-between ml-[5px]">
                    {el?.SomeBody}
                    <div className="td-broder"></div>
                  </div>
                </td>
                <td
                  className={`text-center font-poppins font-semibold text-[10px] lg:text-[16px]    uppercase table-font-color py-[20px] pl-[5px] md:py-[20px] md:pl-[50px] lg:pl-[56px] ${
                    (index + 1) % 2 != 0 ? "bg-orange-primary" : "bg-[#FFF5EB]"
                  } border-primary-title`}
                >
                  <div className="flex justify-between  ml-[10px]">
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
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentWinner;
