import React from "react";
import Image from "next/image";
import { DailyForecast } from "../types/ForecastWeather";
import { getWeatherImage } from "../utils/images";
import { getCurrentDayName } from "../utils/date";

const ForecastTableItem = ({
  day,
  minTemp,
  maxTemp,
  precipitation,
  iconId,
}: DailyForecast) => {
  const currentDay = getCurrentDayName();
  const dayName = day === currentDay ? "Today" : day;
  const icon = getWeatherImage(iconId);
  return (
    <div className="table-row">
      <span>{dayName}</span>
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
        <ForecastTableItem key={day.day} {...day} />
      ))}
    </div>
  );
};

export default ForecastTable;
