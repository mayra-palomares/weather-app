import React from "react";
import Image from "next/image";
import { DailyForecast } from "../types/ForecastWeather";
import { getWeatherImage } from "../utils/images";

const ForecastTableItem = ({
  day,
  minTemp,
  maxTemp,
  precipitation,
  iconId,
}: DailyForecast) => {
  const date = "Today";
  const icon = getWeatherImage(iconId);
  return (
    <div className="table-row">
      <span>{date}</span>
      <div className="precipitation">
        <Image
          src="weather/raindrop.svg"
          alt="precipitation"
          width="40"
          height="40"
          priority={false}
        />
        <span>{precipitation}%</span>
      </div>
      <Image
        src={icon.url}
        alt={icon.text}
        width="40"
        height="40"
        priority={false}
      />
      <span>H:{maxTemp}º</span>
      <span>L:{minTemp}º</span>
    </div>
  );
};

type Props = {
  forecast: DailyForecast[];
};

const ForecastTable = ({ forecast }: Props) => {
  return (
    <div className="forecastTable">
      {forecast.map((day) => (
        <ForecastTableItem {...day} />
      ))}
    </div>
  );
};

export default ForecastTable;
