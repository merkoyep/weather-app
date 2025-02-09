import { InputForm } from '../components/InputForm.tsx';
import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { client } from '../index.tsx';
import { WeatherSection, WeatherType } from '../components/WeatherSection.tsx';

const GET_WEATHER = gql`
  query GetWeather($zip: Int, $lat: Float, $lon: Float, $units: Units!) {
    getWeather(zip: $zip, lat: $lat, lon: $lon, units: $units) {
      temperature
      description
      feelsLike
      tempMin
      tempMax
      pressure
      humidity
      visibility
      windSpeed
      clouds
      cod
      message
      name
    }
  }
`;

export const WeatherDisplay = () => {
  const [zip, setZip] = useState('');
  const [system, setSystem] = useState('metric');
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState(false);

  async function getWeatherByZip() {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_WEATHER,
        variables: { zip: Number(zip), lat: null, lon: null, units: system },
      });
      setWeather(data.getWeather);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  // Fetch weather using geolocation
  async function getWeatherByLocation() {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const { data } = await client.query({
              query: GET_WEATHER,
              variables: {
                zip: null,
                lat: latitude,
                lon: longitude,
                units: system,
              },
            });
            setWeather(data.getWeather);
          } catch (err) {
            console.log(err.message);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  return (
    <div className='flex flex-col m-2 gap-4 p-5 rounded-md bg-white'>
      <h1 className='text-center text-5xl'>🌤️ Weather App</h1>
      <div>
        <InputForm
          zip={zip}
          setZip={setZip}
          getWeatherByZip={getWeatherByZip}
          getWeatherByLocation={getWeatherByLocation}
          system={system}
          setSystem={setSystem}
          loading={loading}
        />
      </div>
      {weather && <WeatherSection {...weather} system={system} />}
    </div>
  );
};
