import Axios from "axios";
const API_KEY = "AIzaSyAIK-xSvm5CGsMq67HoTAsJR1c-u-4B7b8";

export default Axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 15,
    key: API_KEY,
  },
});
