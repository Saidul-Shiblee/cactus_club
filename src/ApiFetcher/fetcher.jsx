import axios from "axios";

const BASE_URL = "https://apis.yummylabs.io";
export const URL = BASE_URL;


export const getWinners = () => axios.get(`${BASE_URL}/getCurrentWinner`).then(res => res.data);

export const getPlayerBalance = () => axios.get(`${BASE_URL}/getPlayerBalance`,{
    headers: {
        "Authorization": localStorage.getItem("cactus_club_token")
    }
}).then(res => res.data);


export const getPlayerWallet = () => axios.get(`${BASE_URL}/getPlayerWallet`,{
    headers: {
        "Authorization": localStorage.getItem("cactus_club_token")
    }
}).then(res => res.data);






