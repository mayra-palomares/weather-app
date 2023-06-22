import React from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/CurrentWeather";
import { ForecastWeather as ForecastWeatherType } from "../types/ForecastWeather";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import SearchInput from "./SearchInput";

type Props = {
  current: CurrentWeatherType;
  forecast: ForecastWeatherType;
};

const searchWeatherInfo = () => {
  console.log("Click on Search");
};

const WeatherData = ({ current, forecast }: Props) => {
  return (
    <div className="weatherPage">
      <SearchInput onClick={searchWeatherInfo} />
      <CurrentWeather data={current} />
      <ForecastWeather data={forecast} />
    </div>
  );
};

export default WeatherData;
