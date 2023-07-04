import React from "react";
import Image from "next/image";
import { DailyForecast } from "../types/ForecastWeather";
import { getWeatherImage } from "../utils/images";

const ForecastListItem = ({ day, minTemp, maxTemp, iconId }: DailyForecast) => {
  const icon = getWeatherImage(iconId);
  return (
    <div className="list-item">
      <span className="title">{day}</span>
      <Image
        src={icon.url}
        alt={icon.text}
        width="100"
        height="100"
        priority={false}
      />
      <span className="temperature">
        {maxTemp}º - {minTemp}º
      </span>
    </div>
  );
};

type Props = {
  forecast: DailyForecast[];
};

const ForecastList = ({ forecast }: Props) => {
  return (
    <div className="forecastList">
      {forecast.map((day) => (
        <ForecastListItem key={day.day} {...day} />
      ))}
    </div>
  );
};

export default ForecastList;
