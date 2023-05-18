import React from "react";
import Image from "next/image";
import CurrentWeatherItem from "./CurrentWeatherItem";

type Props = {
  data: object;
};

const CurrentWeather = ({ data }: Props) => {
  return (
    <div className="currentWeather">
      <div className="title">
        <div>
          <h1 className="temperature">16ºC</h1>
          <h2 className="location">Lisboa, Portugal</h2>
        </div>
        <div className="description">
          <Image src="/weather/rain.svg" alt="rain" width="200" height="200" />
          <span>Feels Like: 15ºC</span>
          <span>H: 23º L:15º</span>
        </div>
      </div>
      <div className="details">
        <CurrentWeatherItem />
        <CurrentWeatherItem />
        <CurrentWeatherItem />
        <CurrentWeatherItem />
      </div>
    </div>
  );
};

export default CurrentWeather;
