import React from "react";
import Image from "next/image";

type Props = {};

const ForecastListItem = (props: Props) => {
  return (
    <div className="list-item">
      <span className="title">Today</span>
      <Image src="/weather/rain.svg" alt="rain" width="100" height="100" />
      <span className="temperature">23º - 15º</span>
    </div>
  );
};

export default ForecastListItem;
