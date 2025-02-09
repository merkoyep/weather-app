import React from 'react';

interface InputFormProps {
  zip: string;
  setZip: (zip: string) => void;
  getWeatherByZip: () => void;
  getWeatherByLocation: () => void;
  system: string;
  setSystem: (system: string) => void;
  loading: boolean;
}

export const InputForm = ({
  zip,
  setZip,
  getWeatherByZip,
  getWeatherByLocation,
  system,
  setSystem,
  loading,
}: InputFormProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSystem(event.target.value);
  };
  return (
    <section className='flex flex-col gap-2'>
      <button
        className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'
        onClick={getWeatherByLocation}
        disabled={loading}
      >
        Use My Location
      </button>
      <h2 className='text-center'>Or</h2>
      <div className='flex flex-row'>
        <form
          className='flex gap-2'
          onSubmit={(e) => {
            e.preventDefault();
            getWeatherByZip();
          }}
        >
          <input
            className='p-1 rounded-md border-2'
            placeholder={'Enter your zip code'}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />

          <label className='flex gap-2 items-center border-2 rounded-md p-2'>
            <p className='text-center'>Units:</p>
            <select value={system} onChange={handleChange} className='h-full'>
              <option value='metric'>Metric</option>
              <option value='imperial'>Imperial</option>
            </select>
          </label>
          <button
            className='text-white rounded-md p-2 text-center bg-blue-500 hover:bg-blue-600 hover:text-white active:bg-blue-700'
            type='submit'
          >
            Get Weather
          </button>
        </form>
      </div>
    </section>
  );
};
