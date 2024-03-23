import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { formattedTimeOnly } from "../../utilities/utilitiesFunction";
import BetDetailsModal from "./BetDetailsModal";
import UiModal from "../Ui/UiModal";
import { useNavigate } from "react-router-dom";
import VerifyData from "./VerifyData";
import UiButton from "../Ui/UiButton";
const MyBets = () => {
  const { authToken, isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const [playerbet, setPlayerBet] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedHistoryVerfiy, setSelectedHistoryVerify] = useState(null);


  const navigate = useNavigate();

  const playerBetHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://apis.yummylabs.io/getPlayerBetHistory",
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setPlayerBet(res?.data?.data?.records);
      if (res?.data?.code == -2) {
        setIsLoggedIn(false);
        navigate("/");
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    playerBetHistory();
  }, []);

  const handleSelectBet = async (data) => {
    try {
      const res = await axios.get(`https://apis.yummylabs.io/getKenoBetHistoryInfo?BetID=${data.BetID}`)
      if (res?.data?.data?.records) {
        setSelectedBet(res?.data?.data?.records);
      }
    } catch (error) {
      console.log(error);
    }
    // Verify Data 
    try {
      const response = await axios.get(`https://apis.yummylabs.io/getKenoBetHistoryVerify?BetID=${data.BetID}`, {
        headers: {
          Authorization: authToken,
        }
      })
      console.log("res>>\n", response);
      if (response?.data) {
        setSelectedHistoryVerify(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-[#128880] py-4 font-rubik text-center"
                      >
                        BetID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Coin
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Bet
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Payout
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-rubik font-medium text-[#128880] py-4 text-center pl-2"
                      >
                        Profit
                      </th>
                    </tr>
                  </thead>
                  {!loading ? (
                    <tbody>
                      {playerbet?.slice(0, 19).map((data, index) => (
                        <tr key={data.BetID} className="">
                          <td
                            onClick={() => handleSelectBet(data)}
                            className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                              } text-[#128880] font-semibold font-poppins py-2 text-center pl-[6px] md:pl-0 cursor-pointer hover:underline`}
                          >
                            {data.BetID}
                          </td>
                          <td
                            className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                              } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {formattedTimeOnly(data.Time)}
                          </td>
                          <td
                            className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                              } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.User}
                          </td>
                          <td
                            className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                              } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.Coin}
                          </td>
                          <td
                            className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                              } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.Bet}
                          </td>
                          <td
                            className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                              } text-[#128880] font-semibold font-poppins py-2 text-center pl-2 `}
                          >
                            {data.Payout}
                          </td>
                          <td
                            className={`text-[11px] ${(index + 1) % 2 != 0
                              ? "bg-white bg-opacity-50"
                              : "bg-none"
                              } ${data.Profit < 0 ? "text-[#C21C00]" : "text-[#128880]"} font-semibold font-poppins py-2 text-center pl-2 pr-[6px] md:pr-0`}
                          >
                            {data.Profit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <p className=" text-primary-title font-semibold flex justify-center items-center mx-auto">
                      Loading.....
                    </p>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <UiModal isOpen={isModalOpen} onClose={closeModal} close={true}>
          <div>
            {<BetDetailsModal data={selectedBet} historyVerify={selectedHistoryVerfiy} />}
            {/* {<VerifyData data={selectedHistoryVerfiy}/>} */}
          </div>
          <div className="flex items-center justify-center mt-[45px]">
            <div onClick={closeModal}>
              <UiButton label={"OK"} classes='w-[294px]'/>
            </div>
          </div>
        </UiModal>
      }
    </div>
  );
};
export default MyBets;
