import axios from 'axios';
const baseUrl = 'https://api.weatherapi.com/v1';

const getWeather = country => {
    const weatherKey = import.meta.env.VITE_API_KEY;
    const lat = country.latlng[0];
    const lng = country.latlng[1];

    return axios.get(`${baseUrl}/current.json?key=${weatherKey}&q=${lat},${lng}&aqi=no`).then(response => response.data);
}

export default { getWeather }