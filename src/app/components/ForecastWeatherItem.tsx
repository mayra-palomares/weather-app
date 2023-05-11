import React from "react";

type Props = {};

const ForecastWeatherItem = (props: Props) => {
  return (
    <div className="list-item">
      <span className="title">Today</span>
      <img />
      <span className="temperature">23º - 15º</span>
    </div>
  );
};

export default ForecastWeatherItem;
