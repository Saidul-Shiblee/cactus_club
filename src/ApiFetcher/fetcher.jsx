import axios from "axios";

const BASE_URL = "https://apis.yummylabs.io";
export const URL = BASE_URL;






export const getWinners = () => axios.get(`${BASE_URL}/getCurrentWinner`).then(res => res.data);


export const getPlayerBalance = (Token) => () =>
  {
   
    
    return axios
    .get(`${BASE_URL}/getPlayerBalance`, {
      headers: {
        Authorization: Token,
      },
    })
    .then((res) => res.data);
}

export const getPlayerWallet = (Token) => () =>
 { 
  
  return axios
    .get(`${BASE_URL}/getPlayerWallet`, {
      headers: {
        Authorization: Token,
      },
    })
    .then((res) => res.data);}

export const getPlayerTransactionHistory = (Token) => () =>
 {
 
  return  axios
    .get(`${BASE_URL}/getPaymentHistory`, {
      headers: {
        Authorization: Token,
      },
    })
    .then((res) => res.data);
}





