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
    const [currencyBalance, setCurrencyBalance]=useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(
     false
    );
    const [selectedCurrency,setSelectedCurrency]=useState(" ")
    const [isEmailVarified, setIsEmailVerified] = useState(false);
    const [userEmail, setUserEmail] = useState("")
     const [currentForm, setCurrentForm] = useState("deposit");

    //Boolean(localStorage.getItem("cactus_club_isLoggedIn"));

    useEffect(() => {
      if(localStorage.getItem("cactus_club_selected_currency")) {
        setSelectedCurrency(localStorage.getItem("cactus_club_selected_currency"))
      } else {
        localStorage.setItem("cactus_club_selected_currency", "ETH");
        setSelectedCurrency("ETH");
      }
    },[])

    
    useEffect(() => {
      const token = localStorage.getItem("cactus_club_token")
      const email = localStorage.getItem("cactus_club_email")
      const emailVerified = localStorage.getItem("cactus_club_email_verified")

      const balance = JSON.parse(
        localStorage.getItem("cactus_club_currency_balance")
      );
      if (balance) {
        setCurrencyBalance(balance);
      }
      if (token) {
        setAuthToken(token);
        setIsLoggedIn(true);
      }
      if(email) {
        setUserEmail(email)
      }
      if(emailVerified) {
        setIsEmailVerified(emailVerified)
        if(emailVerified === "true") setIsEmailVerified(true);
        if(emailVerified === "false") setIsEmailVerified(false);

      }
      
    }, [isLoggedIn]);
    

    useEffect(() => {
      const fetchIP = async () => {
        const ipDetailsFromLocalStorage = JSON.parse(
          localStorage.getItem("cactus_club_client_details")
        );
        if (
          ipDetailsFromLocalStorage?.deviceIP &&
          ipDetailsFromLocalStorage?.country
        ) {
          SetClientInfo(ipDetailsFromLocalStorage);
          return;
        }
        const IpDetalis = await axios.get("https://api.db-ip.com/v2/free/self");
        SetClientInfo((pv) => ({
          ...pv,
          deviceIP: IpDetalis.data.ipAddress,
          country: IpDetalis.data.countryName,
        }));
        localStorage.setItem(
          "cactus_club_client_details",
          JSON.stringify({
            deviceIP: IpDetalis.data.ipAddress,
            country: IpDetalis.data.countryName,
          })
        );
      };
      fetchIP();
    }, []);


    useEffect(() => {
      if (isBrowser) {
        SetDeviceInfo("Browser");
      }
      if (isMobile) {
        SetDeviceInfo("Mobile");
      }
    }, []);


  


    return (
      <Context.Provider
        value={{
          deviceInfo,
          authToken,
          clientInfo,
          currencyBalance,
          isLoggedIn,
          selectedCurrency,
          setSelectedCurrency,
          setIsLoggedIn,
          setAuthToken,
          setCurrencyBalance,
          isEmailVarified,
          setIsEmailVerified,
          userEmail,
          setUserEmail,
          currentForm,
          setCurrentForm,
        }}
      >
        {children}
      </Context.Provider>
    );
}