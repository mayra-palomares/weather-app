import { Location } from "../types/Location";

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
    return fetch(apiUrl + new URLSearchParams(Object.entries(params)));
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