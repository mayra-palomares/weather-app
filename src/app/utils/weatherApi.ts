import LocationType from "../types/Location";
import CurrentData from "./../mocks/CurrentConditions.json";
import ForecastData from "./../mocks/DailyForecast.json";

const useMockData: boolean = false;

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

const getLocationParams = (location: LocationType): Params => {
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

export function getLocationKey(location: LocationType) {
    const params: Params = getLocationParams(location);
    return getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/locations/v1/search?`, params);
}

export async function getCurrentWeather(locationKey: string) {
    const params: Params = getAuthorizationParams();
    params.details = 'true';
    const response = useMockData ? CurrentData.currentConditions : await getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/currentconditions/v1/${locationKey}?`, params);
    const data = response && response.length > 0? response[0] : {}
    return Promise.resolve(data);
}

export async function getForecastWeather(locationKey: string) {
    const params: Params = getAuthorizationParams();
    params.metric = 'true';
    params.details = 'true';
    return useMockData? Promise.resolve(ForecastData.dailyForecast) : getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/forecasts/v1/daily/5day/${locationKey}?`, params);
}