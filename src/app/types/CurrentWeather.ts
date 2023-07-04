export type CurrentWeather = {
    weather?: string;
    city?: string;
    country?: string;
    temperature?: number;
    feelsLikeTemp?: number;
    maxTemp?: number;
    minTemp?: number;
    precipitation?: number;
    humidity?: number;
    wind?: number;
    sunrise?: Date;
    sunset?: Date;
    iconId?: number;
}

export type CurrentWeatherAPIResponse = {
    WeatherIcon : number;
    WeatherText: string;
}