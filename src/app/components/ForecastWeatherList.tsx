import React from "react";
import ForecastWeatherItem from "./ForecastWeatherItem";

type Props = {
  data: object;
};

const ForecastWeatherList = ({ data }: Props) => {
  return (
    <>
      <div>ForecastWeatherList</div>
      <ForecastWeatherItem />
    </>
  );
};

export default ForecastWeatherList;
