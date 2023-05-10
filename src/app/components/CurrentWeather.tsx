import React from "react";

type Props = {
  data: object;
};

const CurrentWeather = ({ data }: Props) => {
  console.log("Current weather: ", data);
  return <div>CurrentWeather</div>;
};

export default CurrentWeather;
