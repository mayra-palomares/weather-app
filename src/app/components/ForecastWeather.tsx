import React from "react";
import ForecastList from "./ForecastList";
import ForecastTable from "./ForecastTable";
import { ForecastWeather } from "../types/ForecastWeather";

type Props = {
  data: ForecastWeather;
};

const ForecastWeather = ({ data }: Props) => {
  const forecast = data.forecast;
  return (
    <>
      <ForecastList forecast={forecast} />
      <ForecastTable forecast={forecast} />
    </>
  );
};

export default ForecastWeather;
