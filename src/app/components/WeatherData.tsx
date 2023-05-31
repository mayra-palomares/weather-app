import React from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/CurrentWeather";
import { ForecastWeather as ForecastWeatherType } from "../types/ForecastWeather";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";

type Props = {
  current: CurrentWeatherType;
  forecast: ForecastWeatherType;
};

const WeatherData = ({ current, forecast }: Props) => {
  return (
    <div className="weatherPage">
      <CurrentWeather data={current} />
      <ForecastWeather data={forecast} />
    </div>
  );
};

export default WeatherData;
