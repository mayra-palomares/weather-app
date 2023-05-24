"use client";

import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getForecastWeather,
  getLocationKey,
} from "./api/weather";
import WeatherData from "./components/WeatherData";
import { Location } from "./types/Location";

export default async function Home() {
  const [location, setLocation] = useState({ valid: false } as Location);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});

  const getNavigatorLocation = (): Promise<Location> => {
    return new Promise((resolve) => {
      let navLocation: Location = { valid: false };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            navLocation.latitude = position.coords.latitude;
            navLocation.longitude = position.coords.longitude;
            navLocation.valid = true;
            resolve(navLocation);
          },
          () => resolve(navLocation)
        );
      } else {
        resolve(navLocation);
      }
    });
  };

  const fetchLocationKey = (navLocation: Location): Promise<Location> => {
    return new Promise((resolve) => {
      getLocationKey(navLocation)
        .then((result) => result.json())
        .then((data) => {
          const locationData = data && data.length > 0 ? data[0] : {};
          const updatedLocation = { ...navLocation, key: locationData.Key };
          setLocation(updatedLocation);
          resolve(updatedLocation);
        });
    });
  };

  const fetchWeatherData = (location: Location) => {
    if (location && location.key) {
      getCurrentWeather(location.key).then((current) => {
        setCurrentWeather(current.json());
      });
      getForecastWeather(location.key).then((forecast) =>
        setForecastWeather(forecast.json())
      );
    }
  };

  useEffect(() => {
    const fetchData = () => {
      getNavigatorLocation().then((navLocation) => {
        fetchLocationKey(navLocation).then((location: Location) => {
          fetchWeatherData(location);
        });
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    //getWeatherData();
  }, [location]);

  return <WeatherData current={currentWeather} forecast={forecastWeather} />;
}
