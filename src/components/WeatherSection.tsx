import React from 'react';

export interface WeatherType {
  system: string;
  temperature?: number;
  description?: string;
  feelsLike?: number;
  tempMin?: number;
  tempMax?: number;
  pressure?: number;
  humidity?: number;
  visibility?: number;
  windSpeed?: number;
  clouds?: number;
  cod?: string | number;
  message?: string;
  name?: string;
}

export const WeatherSection = ({
  system,
  temperature,
  description,
  feelsLike,
  tempMin,
  tempMax,
  pressure,
  humidity,
  visibility,
  windSpeed,
  clouds,
  name,
  cod,
  message,
}: WeatherType) => {
  const tempUnit = system === 'imperial' ? 'F' : 'C';
  return message ? (
    <section>
      <p>🚫 Error: {message}</p>
    </section>
  ) : (
    <section>
      <div className='border-2 p-2 rounded-md'>
        <section className='flex gap-1 justify-center'>
          <h2 className='text-center text-xl font-medium'>
            Today's Weather Information for
          </h2>
          <h2 className='text-xl font-medium text-blue-600'>{name}:</h2>
        </section>
        <h3 className='text-xl text-center'>{description}</h3>
        <p>
          Temperature: {temperature}°{tempUnit}
        </p>
        <p>
          Temperature Min: {tempMin}°{tempUnit}
        </p>
        <p>
          Temperature Max: {tempMax}°{tempUnit}
        </p>
        <p>
          Feels Like: {feelsLike}°{tempUnit}
        </p>
        <p>Barometric Pressure: {pressure}hPa</p>
        <p>Visibility: {visibility ? visibility / 1000 : null}km</p>
        <p>Cloud coverage: {clouds}%</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} km/h</p>
      </div>
    </section>
  );
};
