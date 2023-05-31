import React from "react";
import { DailyForecast } from "../types/ForecastWeather";
import ForecastTableItem from "./ForecastTableItem";

type Props = {
  forecast: DailyForecast[];
};

const ForecastTable = ({ forecast }: Props) => {
  return (
    <div className="forecastTable">
      <ForecastTableItem />
    </div>
  );
};

export default ForecastTable;
