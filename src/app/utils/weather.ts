import { CurrentWeather, CurrentWeatherAPIResponse } from "../types/CurrentWeather";
import { DailyForecast, DailyForecastAPIResponse, ForecastAPIResponse, ForecastWeather } from "../types/ForecastWeather";
import { WeatherData } from "../types/WeatherData";
import CurrentData from "./../mocks/CurrentConditions.json";
import ForecastData from "./../mocks/DailyForecast.json";
import LocationData from "./../mocks/Location.json";

const useMockData: boolean = true;

const parseCurrentWeatherData = (data: CurrentWeatherAPIResponse, forecastData: ForecastAPIResponse, location: Location): CurrentWeather => {
    const currentWeather: CurrentWeather = {};
    console.log('Current weather data: ', data, location);
    if(data) {
        currentWeather.city = location.city;
        currentWeather.country = location.country;
        currentWeather.iconId = data.WeatherIcon;
        currentWeather.weather = data.WeatherText;
    }

    if(forecastData){

    }
    return currentWeather;
  };

const parseForecastWeatherData = (
    data: ForecastAPIResponse
  ): ForecastWeather => {
    console.log('ParseForecastWeatherData', data)
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


type Params = {
    apikey?: string;
    q?: string; //location
    metric?: string;
    details?: string;
}

const getAuthorizationParams = (): Params => {
    return  {
        apikey: process.env.NEXT_PUBLIC_WEATHER_API_KEY!,
    };
}

const getLocationParams = (location: Location): Params => {
    const params: Params = getAuthorizationParams();

    if(location.valid){
        params.q = location.city;
    }else{
        params.q = process.env.NEXT_PUBLIC_DEFAULT_CITY!
    }

    return params;
}

const getData = (apiUrl: string, params: Params) => {
    return fetch(apiUrl + new URLSearchParams(Object.entries(params))).then(response => response.json());
}

function getLocationKey(location: Location) {
    const params: Params = getLocationParams(location);
    return getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/locations/v1/search?`, params);
}

async function getCurrentWeather(locationKey: string) {
    const params: Params = getAuthorizationParams();
    params.details = 'true';
    const response = useMockData ? CurrentData.currentConditions : await getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/currentconditions/v1/${locationKey}?`, params);
    const data = response && response.length > 0? response[0] : {}
    return Promise.resolve(data);
}

async function getForecastWeather(locationKey: string) {
    const params: Params = getAuthorizationParams();
    params.metric = 'true';
    params.details = 'true';
    return useMockData? Promise.resolve(ForecastData.dailyForecast) : getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/forecasts/v1/daily/5day/${locationKey}?`, params);
}

const fetchLocationKey = (city: string): Promise<Location> => {
    const location: Location = city ? {city, valid: true} : {valid: false};
    return new Promise((resolve) => {
      getLocationKey(location).then((data) => {
        console.log('Fetch location key:', data)
        const locationData = data && data.length > 0 ? data[0] : {};
        location.key = locationData.Key;
        location.city = locationData.LocalizedName;
        location.country = locationData.Country.LocalizedName;
        resolve(location);
      });
    });
  };

export default async function fetchWeatherData(city: string = ""){
    const location: Location = useMockData ? LocationData.location :  await fetchLocationKey(city);
    const key = location.key!;
    const data = Promise.allSettled([getCurrentWeather(key), getForecastWeather(key)])
    const [currentResponse, forecastResponse] = await data;

    const weatherData: WeatherData = {currentData :{} as CurrentWeather, forecastData: {} as ForecastWeather};
    if(forecastResponse.status === "fulfilled"){
        weatherData.forecastData = parseForecastWeatherData(forecastResponse.value);
    }
    
    if(currentResponse.status === "fulfilled"){
        weatherData.currentData = parseCurrentWeatherData(currentResponse.value as CurrentWeatherAPIResponse, forecastResponse.value as ForecastAPIResponse, location);
    }
    
    return weatherData;
}