import React, { ReactElement } from "react";
import Image from "next/image";
import { CurrentWeather as CurrentWeatherType } from "../types/CurrentWeather";
import { getWeatherImage } from "../utils/images";

type WeatherItemValueProps = {
  name: string;
  value: string;
};

const WeatherItemValue = ({ name, value }: WeatherItemValueProps) => {
  return (
    <div className="weatherItemValue">
      <label>{name}</label>
      <span>{value}</span>
    </div>
  );
};

type WeatherItemProps = {
  icon: string;
  children: ReactElement;
};

const WeatherItem = ({ icon, children }: WeatherItemProps) => {
  return (
    <div className="detail-item">
      <Image
        src={`weather/${icon}.svg`}
        alt="rain"
        width="80"
        height="80"
        priority={false}
      />
      {children}
    </div>
  );
};

type CurrentWeatherItemProps = {
  icon: string;
  name: string;
  value: string;
};

const CurrentWeatherItem = ({ icon, name, value }: CurrentWeatherItemProps) => {
  return (
    <WeatherItem icon={icon}>
      <WeatherItemValue name={name} value={value} />
    </WeatherItem>
  );
};

type SunriseSunsetItemProps = {
  icon: string;
  sunrise: string;
  sunset: string;
};

const SunriseSunsetItem = ({
  icon,
  sunrise,
  sunset,
}: SunriseSunsetItemProps) => {
  const timeFormat = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunriseStr = timeFormat.format(new Date(sunrise)).toLocaleLowerCase();
  const sunsetStr = timeFormat.format(new Date(sunset)).toLocaleLowerCase();
  return (
    <WeatherItem icon={icon}>
      <div className="sunriseSunsetItem">
        <WeatherItemValue name="Sunrise" value={sunriseStr} />
        <WeatherItemValue name="Sunset" value={sunsetStr} />
      </div>
    </WeatherItem>
  );
};

type CurrentWeatherProps = {
  data: CurrentWeatherType;
};

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const icon = getWeatherImage(data.iconId);
  return (
    <div className="currentWeather">
      <div className="title">
        <div>
          <h1 className="temperature">{data.temperature}ºC</h1>
          <h2 className="location">
            {data.city}, {data.country}
          </h2>
        </div>
        <div className="description">
          <Image
            src={icon.url}
            alt={icon.text}
            width="200"
            height="200"
            priority={false}
          />
          <span>Feels Like: {data.feelsLikeTemp}ºC</span>
          <span>
            H: {data.maxTemp}º L: {data.minTemp}º
          </span>
        </div>
      </div>
      <div className="details">
        <CurrentWeatherItem icon="rain" name="Precipitation" value="2%" />
        <CurrentWeatherItem icon="humidity" name="Humidity" value="44%" />
        <CurrentWeatherItem icon="wind" name="Wind" value="28 km/h" />
        <SunriseSunsetItem
          icon="horizon"
          sunrise={"2023-07-03T06:16:00+01:00"}
          sunset={"2023-07-03T21:05:00+01:00"}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
