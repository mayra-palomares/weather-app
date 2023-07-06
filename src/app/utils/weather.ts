import {getCurrentWeather, getForecastWeather, getLocationKey} from "./weatherApi";
import { CurrentWeather, CurrentWeatherAPIResponse } from "../types/CurrentWeather";
import { DailyForecast, DailyForecastAPIResponse, ForecastAPIResponse, ForecastWeather } from "../types/ForecastWeather";
import { WeatherData } from "../types/WeatherData";
import LocationType from "../types/Location";
import LocationData from "./../mocks/Location.json";

const useMockData: boolean = true;

/* PARSERS */
const parseLocationData = (location:LocationType, data):LocationType => {
    const locationData = data && data.length > 0 ? data[0] : {};
    location.key = locationData.Key;
    location.city = locationData.LocalizedName;
    location.country = locationData.Country.LocalizedName;
    return location
}

const parseCurrentWeatherData = (data: CurrentWeatherAPIResponse, forecastData: DailyForecastAPIResponse, location: LocationType): CurrentWeather => {
    const currentWeather: CurrentWeather = {};
    if(data) {
        currentWeather.city = location.city;
        currentWeather.country = location.country;
        currentWeather.iconId = data.WeatherIcon;
        currentWeather.weather = data.WeatherText;
        currentWeather.temperature = Math.trunc(data.Temperature.Metric.Value);
        currentWeather.feelsLikeTemp = Math.trunc(data.RealFeelTemperature.Metric.Value);
        currentWeather.wind = data.Wind.Speed.Metric.Value;
        currentWeather.humidity = data.RelativeHumidity;
    }

    if(forecastData){
        currentWeather.sunrise = forecastData.Sun.Rise;
        currentWeather.sunset = forecastData.Sun.Set;
        currentWeather.maxTemp = forecastData.Temperature.Maximum.Value;
        currentWeather.minTemp = forecastData.Temperature.Minimum.Value;
        currentWeather.precipitation = Math.max(forecastData.Day.PrecipitationProbability, forecastData.Night.PrecipitationProbability,0);
      }
    return currentWeather;
};

const parseForecastWeatherData = (
    data: ForecastAPIResponse
  ): ForecastWeather => {
    const forecast: Array<DailyForecast> = [];
    const dailyForecasts = data.DailyForecasts as DailyForecastAPIResponse[];
    dailyForecasts.forEach((dayData) => {
        const date = new Date(dayData.Date);
        const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
        const dailyForecast: DailyForecast = {
            day: dayName,
            minTemp: dayData.Temperature.Minimum.Value,
            maxTemp: dayData.Temperature.Maximum.Value,
            precipitation: dayData.Day.PrecipitationProbability,
            weather: dayData.Day.IconPhrase,
            iconId: dayData.Day.Icon
        }
        forecast.push(dailyForecast);
    });
    return {forecast: forecast};
};

const parseData = async (location: LocationType, data: Promise<[PromiseSettledResult<any>, PromiseSettledResult<any>]>) => {
    const [currentResponse, forecastResponse] = await data;
    const weatherData: WeatherData = {currentData :{} as CurrentWeather, forecastData: {} as ForecastWeather};
    let todayForecast = {} as DailyForecastAPIResponse;

    if(forecastResponse.status === "fulfilled"){
        todayForecast = forecastResponse.value && forecastResponse.value?.DailyForecasts?.length > 0 ? forecastResponse.value.DailyForecasts[0] : {};
        weatherData.forecastData = parseForecastWeatherData(forecastResponse.value);
    }
    
    if(currentResponse.status === "fulfilled"){
        weatherData.currentData = parseCurrentWeatherData(currentResponse.value as CurrentWeatherAPIResponse, todayForecast, location);
    }
    return weatherData;
}

/* FETCH DATA */
const fetchLocationKey = (city: string): Promise<LocationType> => {
    let location: LocationType = city ? {city, valid: true} : {valid: false};
    return new Promise((resolve) => {
      getLocationKey(location).then((data) => {
        location = parseLocationData(location,data);
        resolve(location);
      });
    });
  };

export default async function fetchWeatherData(city: string = ""){
    const location: LocationType = useMockData ? LocationData.location :  await fetchLocationKey(city);
    const key = location.key!;
    const data = Promise.allSettled([getCurrentWeather(key), getForecastWeather(key)])
    const weatherData =  await parseData(location, data);
    return weatherData;
}