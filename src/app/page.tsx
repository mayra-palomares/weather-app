"use client";

import { useEffect, useState } from "react";
import { getCurrentWeather, getForecastWeather } from "./api/weather";
import WeatherData from "./components/WeatherData";
import { Coordinates } from "./types/Location";

export default async function Home() {
  const [location, setLocation] = useState({ valid: false } as Coordinates);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});

  const getWeatherData = () => {
    getCurrentWeather(location).then((current) => setCurrentWeather(current));
    getForecastWeather(location).then((forecast) =>
      setForecastWeather(forecast)
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          valid: true,
        });
      });
    } else {
      getWeatherData();
    }
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [location]);

  return <WeatherData current={currentWeather} forecast={forecastWeather} />;
}
