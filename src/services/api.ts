import axios from 'axios';

export const openWeatherMap = axios.create({
  baseURL: 'http://api.openweathermap.org/',
});

export const openStreetMaps = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/',
});
