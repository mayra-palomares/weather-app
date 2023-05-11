import React from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastWeatherList from "./ForecastWeatherList";

type Props = {
  current: object;
  forecast: object;
};

const WeatherData = ({ current, forecast }: Props) => {
  return (
    <div className="weatherPage">
      <CurrentWeather data={current} />
      <ForecastWeatherList data={forecast} />
    </div>
  );
};

export default WeatherData;
