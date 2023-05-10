import React from "react";
import ForecastWeatherItem from "./ForecastWeatherItem";

type Props = {
  data: object;
};

const ForecastWeatherList = ({ data }: Props) => {
  console.log("Forecast Weather:", data);
  return (
    <>
      <div>ForecastWeatherList</div>
      <ForecastWeatherItem />
    </>
  );
};

export default ForecastWeatherList;
