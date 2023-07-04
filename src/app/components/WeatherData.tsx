"use client";

import React, { useEffect, useState } from "react";
import { WeatherData } from "../types/WeatherData";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import SearchInput from "./SearchInput";
import fetchWeatherData from "./../utils/weather";

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWeatherData();
      setWeatherData({ ...response });
    };

    fetchData();
  }, []);

  const handleSearch = async (city: string) => {
    const response = await fetchWeatherData(city);
    setWeatherData({ ...response });
  };

  return (
    <div className="weatherPage">
      <SearchInput onSearch={handleSearch} />
      {weatherData ? (
        <>
          <CurrentWeather data={weatherData.currentData} />
          <ForecastWeather data={weatherData.forecastData} />
        </>
      ) : null}
    </div>
  );
};

export default WeatherData;
