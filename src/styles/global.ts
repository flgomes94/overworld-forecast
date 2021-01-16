import { createGlobalStyle } from 'styled-components';

import WeatherBackground from '../assets/weather-background.svg';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  body {
    background:#F39C12;
    -webkit-font-smoothing:antialiased;
    background-image:url(${WeatherBackground});
    background-position:800px 30px;
    background-repeat: no-repeat;
    background-size: 400px;
  }


  body,input,button {
    font:16px Roboto, sans-serif;
  }

  #root{
    max-width:960px;
    margin:0 auto 0 auto;
    padding:40px 20px;
  }

  button {
    cursor:pointer;
  }
`;
