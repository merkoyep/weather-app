import React from 'react';

interface InputFormProps {
  zip: string;
  setZip: (zip: string) => void;
  getWeather: () => void;
  system: string;
  setSystem: (system: string) => void;
}

export const InputForm = ({
  zip,
  setZip,
  getWeather,
  system,
  setSystem,
}: InputFormProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSystem(event.target.value);
  };
  return (
    <div className='flex flex-row'>
      <form
        className='flex gap-2'
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
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
          className='text-blue-600 rounded-md p-2 border-2 text-center hover:bg-blue-600 hover:text-white hover:border-2 active:bg-blue-700'
          type='submit'
        >
          Get Weather
        </button>
      </form>
    </div>
  );
};
