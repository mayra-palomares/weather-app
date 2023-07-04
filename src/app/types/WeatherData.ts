import { CurrentWeather } from "./CurrentWeather"
import { ForecastWeather } from "./ForecastWeather";

export type WeatherData = {
    currentData : CurrentWeather;
    forecastData : ForecastWeather;
}