import { createContext, useContext, useState } from "react";
import {
    isBrowser,
    isMobile,
} from "react-device-detect";
import { useEffect } from 'react'
import axios from 'axios'


export const Context = createContext();

export function useGlobalContext() {
    const globalContext = useContext(Context)
    return globalContext;
}

export function ContextProvider({ children }) {

    const [deviceInfo,SetDeviceInfo]=useState(null)
    const [clientInfo, SetClientInfo] = useState({});
    const [authToken,setAuthToken]=useState("")
    const [currencyBalance, setCurrencyBalance]=useState(null)
    const [isLoggedIn,setIsLoggedIn]=useState(false)

    
    useEffect(() => {

      const token=localStorage.getItem("cactus_club_token")
    //   console.log("stor token", token)

      const balance = JSON.parse(localStorage.getItem("cactus_club_currency_balance"))
        if (balance) {
            setCurrencyBalance(balance)
        }
      if(token){
          setAuthToken(token)
          setIsLoggedIn(true)
      }
    }, [])
   
    

    useEffect(() => {
        const fetchIP = async () => {
            const ipDetailsFromLocalStorage = JSON.parse(localStorage.getItem("cactus_club_client_details")) ;
            if(ipDetailsFromLocalStorage?.deviceIP && ipDetailsFromLocalStorage?.country){
                SetClientInfo(ipDetailsFromLocalStorage);
                return
            }
            const IpDetalis = await axios.get("https://api.db-ip.com/v2/free/self");
            SetClientInfo((pv) => ({
              ...pv,
              deviceIP: IpDetalis.data.ipAddress,
              country: IpDetalis.data.countryName,
            }));
            localStorage.setItem("cactus_club_client_details",JSON.stringify({
                deviceIP: IpDetalis.data.ipAddress,
                country: IpDetalis.data.countryName
            }))
        }
        fetchIP()
    }, [])


    useEffect(() => {

        if (isBrowser) {
            SetDeviceInfo("Browser");
        }
        if (isMobile) {
            SetDeviceInfo('Mobile')
        }

    }, [])


  


    return (
        <Context.Provider value={{ deviceInfo, authToken,clientInfo, currencyBalance, isLoggedIn, setIsLoggedIn, setAuthToken, setCurrencyBalance}}>
            {children}
        </Context.Provider>
    );
}