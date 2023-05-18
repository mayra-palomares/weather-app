import React from "react";
import ForecastListItem from "./ForecastListItem";

type Props = {
  data: object;
};

const ForecastList = ({ data }: Props) => {
  return (
    <div className="forecastList">
      <ForecastListItem />
      <ForecastListItem />
      <ForecastListItem />
      <ForecastListItem />
    </div>
  );
};

export default ForecastList;
