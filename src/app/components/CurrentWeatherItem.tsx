import React from "react";
import Image from "next/image";

type Props = {};

const CurrentWeatherItem = (props: Props) => {
  return (
    <div className="detail-item">
      <Image src="/weather/rain.svg" alt="rain" width="50" height="50" />
      <span>Precipitation</span>
      <span>2%</span>
    </div>
  );
};

export default CurrentWeatherItem;
