import axios from "axios";

const BASE_URL = "https://apis.yummylabs.io";


export const getWinners = () => axios.get(`${BASE_URL}/getCurrentWinner`).then(res => res.data);




