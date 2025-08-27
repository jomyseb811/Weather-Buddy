import axios from "axios";

const API_KEY = "9fb45f40242fd9678f3353b5f3cc73b0"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const res = await axios.get(
      `${BASE_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
