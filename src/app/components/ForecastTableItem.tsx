import React from "react";
import Image from "next/image";
import { getWeatherImage } from "../utils/images";
import { DailyForecast } from "../types/ForecastWeather";

type Props = {};

const ForecastTableItem = ({
  day,
  minTemp,
  maxTemp,
  precipitation,
  iconId,
}: DailyForecast) => {
  const icon = getWeatherImage(iconId);
  return (
    <div className="table-row">
      <span>{day}</span>
      <div className="precipitation">
        <Image src="/weather/rain.svg" alt="rain" width="40" height="40" />
        <span>{precipitation}%</span>
      </div>
      <Image src={icon.url} alt={icon.text} width="40" height="40" />
      <span>{maxTemp}º</span>
      <span>{minTemp}º</span>
    </div>
  );
};

export default ForecastTableItem;
