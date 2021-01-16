import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Title, Header, CurrentWeatherInfo, Weathers, Weather } from './styles';
import { openWeatherMap } from '../../services/api';
import Sunrise from '../../assets/sunrise.svg';
import Sunset from '../../assets/sunset.svg';
import Humidity from '../../assets/humidity.svg';
import Atm from '../../assets/atm.svg';

interface CityParams {
  location: string;
}

interface Weather {
  humidity: string;
  pressure: string;
  sunrise: string;
  sunset: string;
  temp: {
    day: string;
  };
  dt: string;
  weather: {
    main: string;
    icon: string;
    description: string;
  }[];
}

interface WeatherResponse {
  current: Weather;
  daily: Weather[];
}

interface CityProps {
  location: {
    state: {
      lat: string;
      lon: string;
    };
  };
}
const City: React.FC<CityProps> = (props: CityProps) => {
  const { params } = useRouteMatch<CityParams>();
  const { location } = props;
  const { state } = location;
  const { lat, lon } = state;
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [futureWeathers, setFutureWeathers] = useState<Weather[] | null>(null);
  const days = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  useEffect(() => {
    openWeatherMap
      .get<WeatherResponse>(
        `/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${'88ee0453a5f973bcb394d3b20e6fb0d5'}&units=metric&lang=pt_br&exclude=minutely,hourly,alerts`,
      )
      .then((response) => {
        setCurrentWeather(response.data.current);
        setFutureWeathers(response.data.daily);
      });
  }, [lat, lon]);

  return (
    <>
      <Header>
        <Title>Overworld Forecast</Title>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {currentWeather && (
        <CurrentWeatherInfo>
          <header>
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt={currentWeather.weather[0].description}
            />
            <div>
              <strong>{params.location}</strong>

              <p>{`${currentWeather.temp} °C`}</p>
              <p>{currentWeather.weather[0].description}</p>
            </div>
          </header>
          <ul>
            <li>
              <img src={Sunrise} alt="Nascer do sol" />
              <p>
                {new Date(Number(currentWeather.sunrise) * 1000)
                  .toTimeString()
                  .slice(0, 5)}
              </p>
            </li>
            <li>
              <img src={Sunset} alt="Por do sol" />
              <p>
                {new Date(Number(currentWeather.sunset) * 1000)
                  .toTimeString()
                  .slice(0, 5)}
              </p>
            </li>
            <li>
              <img src={Humidity} alt="Umidade" />
              <p>{`${currentWeather.humidity} %`}</p>
            </li>
            <li>
              <img src={Atm} alt="Pressão" />
              <p>{`${currentWeather.pressure} atm`}</p>
            </li>
          </ul>
        </CurrentWeatherInfo>
      )}
      {futureWeathers && (
        <Weathers>
          {futureWeathers.map((weather) => (
            <Weather key={weather.dt}>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <div>
                <strong>
                  {days[new Date(Number(weather.dt) * 1000).getUTCDay()]}
                </strong>
                <p>{weather.weather[0].description}</p>
                <p>{`, ${weather.temp.day} °C`}</p>
              </div>
              <ul>
                <li>
                  <img src={Sunrise} alt="Nascer do sol" width={24} />
                  <p>
                    {new Date(Number(weather.sunrise) * 1000)
                      .toTimeString()
                      .slice(0, 5)}
                  </p>
                </li>
                <li>
                  <img src={Sunset} alt="Por do sol" width={24} />
                  <p>
                    {new Date(Number(weather.sunset) * 1000)
                      .toTimeString()
                      .slice(0, 5)}
                  </p>
                </li>
                <li>
                  <img src={Humidity} alt="Umidade" width={24} />
                  <p>{`${weather.humidity} %`}</p>
                </li>
                <li>
                  <img src={Atm} alt="Pressão" width={24} />
                  <p>{`${weather.pressure} atm`}</p>
                </li>
              </ul>
            </Weather>
          ))}
        </Weathers>
      )}
    </>
  );
};

export default City;
