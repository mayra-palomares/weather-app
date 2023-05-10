import { getCurrentWeather, getForecastWeather } from "./api/weather";
import WeatherData from "./components/WeatherData";

export default async function Home() {
  const currentWeather = await getCurrentWeather();
  const forecastWeather = await getForecastWeather();
  return <WeatherData current={currentWeather} forecast={forecastWeather} />;
}
