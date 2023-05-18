import React from "react";
import ForecastList from "./ForecastList";
import ForecastTable from "./ForecastTable";

type Props = {
  data: object;
};

const ForecastWeather = ({ data }: Props) => {
  return (
    <>
      <ForecastList data={data} />
      <ForecastTable data={data} />
    </>
  );
};

export default ForecastWeather;
