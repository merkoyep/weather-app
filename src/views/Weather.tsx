import { InputForm } from '../components/InputForm.tsx';
import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { client } from '../index.tsx';
import { WeatherSection, WeatherType } from '../components/WeatherSection.tsx';

const GET_WEATHER = gql`
  query GetWeather($zip: Int!, $units: Units!) {
    getWeather(zip: $zip, units: $units) {
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

  async function getWeather() {
    try {
      const { data } = await client.query({
        query: GET_WEATHER,
        variables: { zip: Number(zip), units: system },
      });

      setWeather(data.getWeather);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className='flex flex-col m-2 gap-4 p-5 rounded-md bg-white'>
      <h1 className='text-center text-5xl'>🌤️ Weather App</h1>
      <div>
        <InputForm
          zip={zip}
          setZip={setZip}
          getWeather={getWeather}
          system={system}
          setSystem={setSystem}
        />
      </div>
      {weather && <WeatherSection {...weather} system={system} />}
    </div>
  );
};
