import React from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";

type Props = {
  current: object;
  forecast: object;
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
