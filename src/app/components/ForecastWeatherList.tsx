import React from "react";
import ForecastWeatherItem from "./ForecastWeatherItem";

type Props = {
  data: object;
};

const ForecastWeatherList = ({ data }: Props) => {
  return (
    <div className="forecastWeather">
      <ForecastWeatherItem />
      <ForecastWeatherItem />
      <ForecastWeatherItem />
      <ForecastWeatherItem />
    </div>
  );
};

export default ForecastWeatherList;
