import React from "react";
import ForecastListItem from "./ForecastListItem";
import { DailyForecast } from "../types/ForecastWeather";

type Props = {
  forecast: DailyForecast[];
};

const ForecastList = ({ forecast }: Props) => {
  return (
    <div className="forecastList">
      {forecast.map((day) => (
        <ForecastListItem {...day} />
      ))}
    </div>
  );
};

export default ForecastList;
