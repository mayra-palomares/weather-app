import { Coordinates } from "../types/Location";

type Params = {
    units: string;
    appid: string;
    lat?: string;
    lon?: string;
    q?: string; //city
}

const getParams = (location: Coordinates) => {
    const params: Params = {
        units: 'metric',
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY!,
    };
    if(location.valid){
        params.lat = location.latitude.toString();
        params.lon = location.longitude.toString();
    }else{
        params.q = process.env.NEXT_PUBLIC_DEFAULT_CITY!
    }

    return Object.entries(params);
}

const getData = (apiUrl: string, location: Coordinates) => {
    const params = getParams(location);
    return fetch(apiUrl + new URLSearchParams(params));
}

export function getCurrentWeather(location: Coordinates) {
    return getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/weather?`, location);
}

export function getForecastWeather(location: Coordinates, days: number = 4) {
    return getData(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/forecast?cnt=${days}&`, location);
}