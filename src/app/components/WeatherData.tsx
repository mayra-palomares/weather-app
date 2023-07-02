"use client";

import React, { useEffect, useState } from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/CurrentWeather";
import { ForecastWeather as ForecastWeatherType } from "../types/ForecastWeather";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import SearchInput from "./SearchInput";
import fetchWeatherData from "./../utils/weather";

const WeatherData = () => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherType>(null);
  const [forecastWeather, setForecastWeather] =
    useState<ForecastWeatherType>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [currentWeather, forecastWeather] = await fetchWeatherData(
        "Lisbon"
      );
      setCurrentWeather(currentWeather);
      setForecastWeather(forecastWeather);
    };

    fetchData();
  }, []);

  const handleSearch = async (city: string) => {
    const [currentWeather, forecastWeather] = await fetchWeatherData(city);
    setCurrentWeather(currentWeather);
    setForecastWeather(forecastWeather);
  };

  return (
    <div className="weatherPage">
      <SearchInput onSearch={handleSearch} />
      {currentWeather ? <CurrentWeather data={currentWeather} /> : null}
      {forecastWeather ? <ForecastWeather data={forecastWeather} /> : null}
    </div>
  );
};

export default WeatherData;
