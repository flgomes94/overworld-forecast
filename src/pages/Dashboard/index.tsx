import React, { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiX } from 'react-icons/fi';
import { Title, SubTitle, Form, Cities } from './styles';
import { openStreetMaps, openWeatherMap } from '../../services/api';

interface WeatherResponse {
  current: {
    temp: string;
    weather: Weather[];
  };
}

interface Weather {
  description: string;
  main: string;
  icon: string;
}

interface Location {
  address: {
    city?: string;
    state: string;
    country: string;
    town?: string;
  };
  lat: string;
  lon: string;
  place_id: string;
  weather: WeatherResponse;
}

const Dashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [locations, setLocations] = useState<Location[]>(() => {
    const storagedLocations = localStorage.getItem(
      '@OverworldForecast:Locations',
    );

    if (storagedLocations) {
      return JSON.parse(storagedLocations);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@OverworldForecast:Locations',
      JSON.stringify(locations),
    );
  }, [locations]);

  function handleDeleteCity(place_id: string) {
    const newLocations = locations.filter(
      (location) => location.place_id !== place_id,
    );
    setLocations(newLocations);
  }

  async function handleAddCity(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    if (!inputValue) {
      setInputError('Digite a localidade do cidade');
    }
    try {
      const responseOpenStreetMaps = await openStreetMaps.get<Location[]>(
        `/search?format=json&addressdetails=1&countrycodes=br&q=${inputValue}`,
      );
      if (!responseOpenStreetMaps.data.length) {
        throw Error();
      }
      const location = responseOpenStreetMaps.data[0];
      const responseOpenWeatherMaps = await openWeatherMap.get<WeatherResponse>(
        `/data/2.5/onecall?lat=${location.lat}&lon=${
          location.lon
        }&appid=${'88ee0453a5f973bcb394d3b20e6fb0d5'}&units=metric&lang=pt_br&exclude=minutely,hourly,daily,alerts`,
      );
      location.weather = responseOpenWeatherMaps.data;
      setLocations([...locations, location]);
    } catch (err) {
      setInputError('Erro na busca da cidade');
    }
  }
  return (
    <>
      <Title>Overworld Forecast</Title>
      <SubTitle>
        Digite sua cidade e descubra as temperaturas da sua região
      </SubTitle>
      <Form hasError={!!inputError} action="" onSubmit={handleAddCity}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite o nome da localidade"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Cities>
        {locations.map((location) => (
          <Link
            to={{
              pathname: `/cities/${
                location.address.city || location.address.town
              }, ${location.address.state}, ${location.address.country}`,
              state: {
                lat: location.lat,
                lon: location.lon,
              },
            }}
            key={location.place_id}
          >
            <FiX
              size={20}
              color="#c0392b"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteCity(location.place_id);
              }}
            />
            <img
              src={`http://openweathermap.org/img/wn/${location.weather.current.weather[0].icon}@2x.png`}
              alt={location.weather.current.weather[0].description}
            />
            <div>
              <strong>
                {`${location.address.city || location.address.town}, ${
                  location.address.state
                }, ${location.address.country}`}
              </strong>
              <p>{`${location.weather.current.weather[0].description}, ${location.weather.current.temp}°C`}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Cities>
    </>
  );
};

export default Dashboard;
