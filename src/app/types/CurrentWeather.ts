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
    sunrise?: string;
    sunset?: string;
    iconId?: number;
}

export type CurrentWeatherAPIResponse = {
    WeatherIcon : number;
    WeatherText: string;
    Temperature: {
        Metric: {
            Value: number;
        }
    },
    RealFeelTemperature: {
        Metric: {
            Value: number;
        }
    },
    Wind: {
        Speed: {
            Metric: {
                Value:  number;
            }
        }
    },
    RelativeHumidity: number;
}