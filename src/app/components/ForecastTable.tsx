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
  const icon = getWeatherImage(iconId);
  return (
    <div className="table-row">
      <span>{day}</span>
      <div className="precipitation">
        <Image
          src={icon.url}
          alt="rain"
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
      <span>{maxTemp}º</span>
      <span>{minTemp}º</span>
    </div>
  );
};

type Props = {
  forecast: DailyForecast[];
};

const ForecastTable = ({ forecast }: Props) => {
  return (
    <div className="forecastTable">
      <ForecastTableItem
        day={"Today"}
        minTemp={19}
        maxTemp={25}
        precipitation={2}
        iconId={11}
      />
    </div>
  );
};

export default ForecastTable;
