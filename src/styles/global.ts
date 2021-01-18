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
    background-position:60vw 2vh;
    background-repeat: no-repeat;
    background-size: 30vw 30vh;
  }


  body,input,button {
    font:12pt Roboto, sans-serif;
  }

  #root{
    width:70vw;
    margin:0 15vw 0 15vw;
  }

  button {
    cursor:pointer;
  }
`;
