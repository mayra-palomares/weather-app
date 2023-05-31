import { CurrentWeather } from "../types/CurrentWeather";
import { DailyForecast, DailyForecastAPIResponse, ForecastAPIResponse, ForecastWeather } from "../types/ForecastWeather";
import { Location } from "../types/Location";

export const parseCurrentWeatherData = (data: object): CurrentWeather => {
    const currentWeather: CurrentWeather = {};

    return currentWeather;
  };

export const parseForecastWeatherData = (
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
        params.q = location.latitude + '-' + location.longitude;
    }else{
        params.q = process.env.NEXT_PUBLIC_DEFAULT_CITY!
    }

    return params;
}

const getData = (apiUrl: string, params: Params) => {
    return fetch(apiUrl + new URLSearchParams(Object.entries(params))).then(response => response.json());
}

export function getLocationKey(location: Location) {
    const params: Params = getLocationParams(location);
    return getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/locations/v1/search?`, params);
}

export function getCurrentWeather(locationKey: string) {
    const params: Params = getAuthorizationParams();
    params.details = 'true';
    return getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/currentconditions/v1/${locationKey}?`, params);
}

export function getForecastWeather(locationKey: string) {
    const params: Params = getAuthorizationParams();
    params.metric = 'true';
    params.details = 'true';
    return getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/forecasts/v1/daily/5day/${locationKey}?`, params);
}