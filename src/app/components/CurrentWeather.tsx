import React from "react";
import Image from "next/image";

type WeatherItemProps = {
  icon: string;
  name: string;
  value: string;
};

const CurrentWeatherItem = ({ icon, name, value }: WeatherItemProps) => {
  return (
    <div className="detail-item">
      <Image src={`weather/${icon}.svg`} alt="rain" width="50" height="50" />
      <span>{name}</span>
      <span>{value}</span>
    </div>
  );
};

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
        <CurrentWeatherItem icon="rain" name="Precipitation" value="2%" />
        <CurrentWeatherItem icon="rain" name="Humidity" value="44%" />
        <CurrentWeatherItem icon="rain" name="Wind" value="28 km/h" />
        <CurrentWeatherItem icon="rain" name="Sunrise" value="6:28 a.m." />
      </div>
    </div>
  );
};

export default CurrentWeather;
