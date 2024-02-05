import React from 'react';
import { useState } from 'react';

const Search = () => {
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState('');

  const getWeather = async () => {
    const api_key = 'eb9dea318b3347feb5a111844231602';
    const api_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;
    if (location) {
      try {
        const res = await fetch(api_url);
        const data = await res.json();
        if (data) {
          const api_data = {
            country: data.location.country,
            city: data.location.name,
            temp: data.current.temp_f,
            humidity: data.current.humidity,
            wind: data.current.wind_mph,
            gust: data.current.gust_mph,
            visibility: data.current.vis_miles,
            condition: data.current.condition.text,
          };

          setWeather(
            <>
              <div className="text-center font-bold text-8xl pt-8">
                {api_data.city}
              </div>
              <div className="flex justify-center">
                <div className="">
                  <div className=" font-bold text-7xl degrees">
                    {api_data.temp}F
                  </div>
                </div>
              </div>
              <div className="text-center text-3xl text-bold text-white">
                {api_data.condition}
              </div>
              <div className=" flex pl-8 text-xl justify-around ">
                <div className='p-6 '>
                  <div className=" text-white">
                    Humidity: {api_data.humidity}%
                  </div>
                  <div className="text-white">
                    Wind: {api_data.wind}mph
                  </div>
                </div>
                <div className='p-6'>
                  <div className="text-white">
                    Visibility: {api_data.visibility}mi
                  </div>
                  <div className=" text-white">
                    Gust: {api_data.gust}mph
                  </div>
                </div>
              </div>

            </>
          );

          setLocation('');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // Invalid: location is empty
    }
  };

  const handleKeyUp = (key) => {
    if (key === 'Enter') {
      getWeather();
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-500 text-white">
      <nav className="flex items-center justify-between py-4 bg-opacity-90 shadow-2xl px-6">
        <div className='text-2xl font-bold'>
          Weather App
        </div>
      </nav>
      <div className='flex items-center justify-center  bg-opacity-90 p-6'>
        <div className="flex items-center">
          <input
            className="block bg-transparent text-white placeholder-white border-b-2 border-white py-2 px-4 focus:outline-none rounded-xl"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyUp={(e) => handleKeyUp(e.key)}
            placeholder="Enter Location"
          />
          <button
            className="bg-purple-500 hover:bg-purple-600 font-bold p-2 rounded-xl text-white ml-2"
            id="search"
            onClick={getWeather}
          >
            Search
          </button>
        </div>
      </div>

      {weather && (
        <div className="flex flex-col items-center p-5 md:p-20">
          <div className="w-full max-w-md md:max-w-2xl lg:max-w-2xl shadow-2xl rounded-2xl">
            <div>{weather}</div>
          </div>
        </div>

      )}
    </div>





  );
};

export default Search;
