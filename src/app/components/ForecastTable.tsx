import React from "react";
import Image from "next/image";

type Props = {
  data: object;
};

const ForecastTable = ({ data }: Props) => {
  return (
    <div className="forecastTable">
      <div className="table-row">
        <span>Today</span>
        <div className="precipitation">
          <Image src="/weather/rain.svg" alt="rain" width="40" height="40" />
          <span>2%</span>
        </div>
        <Image src="/weather/rain.svg" alt="rain" width="40" height="40" />
        <span>23ºC</span>
        <span>15ºC</span>
      </div>
    </div>
  );
};

export default ForecastTable;
