import React, { useState, useEffect } from 'react';

const Search = () => {
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = async () => {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const api_key = 'eb9dea318b3347feb5a111844231602';
          const api_url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${latitude},${longitude}`;

          const res = await fetch(api_url);
          const data = await res.json();

          if (data.error) {
            setError('Failed to fetch weather data for your location.');
          } else {
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

            setWeather(api_data);
            setLocation(`${api_data.city}, ${api_data.country}`);
            setError('');
          }
        });
      } else {
        setError('Geolocation is not supported in your browser.');
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch weather data.');
    }
  };

  const handleSearch = async () => {
    try {
      const api_key = 'eb9dea318b3347feb5a111844231602';
      const api_url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;

      const res = await fetch(api_url);
      const data = await res.json();

      if (data.error) {
        setError('Invalid location. Please enter a valid city name.');
      } else {
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

        setWeather(api_data);
        setLocation(`${api_data.city}, ${api_data.country}`);
        setError('');
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch weather data.');
    }
  };

  const handleKeyUp = (key) => {
    if (key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-r from-blue-300 to-purple-500 text-white">
      <nav class="flex items-center justify-between py-4 bg-opacity-90 shadow-2xl px-6">
        <div class='text-2xl font-bold'>
          Weather App
        </div>
      </nav>
      <div class='flex items-center justify-center bg-opacity-90 p-6'>
        <div class="flex items-center w-full max-w-lg">
          <input
            class="block flex-grow bg-transparent text-white placeholder-white border-b-2 border-white py-2 px-4 focus:outline-none rounded-l-xl"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyUp={(e) => handleKeyUp(e.key)}
            placeholder="Enter Location"
          />
          <button
            class="bg-purple-500 hover:bg-purple-600 font-bold p-2 rounded-r-xl text-white ml-2"
            id="search"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div class="text-red-500 font-bold text-center">{error}</div>
      )}

      {weather && (
        <div class="flex flex-col items-center px-5 md:px-20 py-5 md:py-20">
          <div class="w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl shadow-2xl rounded-2xl">
            <div class="text-center font-bold text-5xl md:text-8xl pt-8">
              {weather.city}
            </div>
            <div class="flex justify-center">
              <div class="">
                <div class=" font-bold text-4xl md:text-7xl degrees">
                  {weather.temp}F
                </div>
              </div>
            </div>
            <div class="text-center font-bold text-xl md:text-3xl text-bold text-white">
              {weather.condition}
            </div>
            <div class="flex font-bold justify-around  md:flex-row ">
              <div class="p-6  overflow-hidden">
                <div class="text-white">
                  Humidity: {weather.humidity}%
                </div>
                <div class="text-white">
                  Wind: {weather.wind}mph
                </div>
              </div>
              <div class="p-6 overflow-hidden">
                <div class="text-white">
                  Visibility: {weather.visibility}mi
                </div>
                <div class="text-white">
                  Gust: {weather.gust}mph
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>


  );
};

export default Search;
