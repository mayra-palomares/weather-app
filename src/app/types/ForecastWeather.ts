export type DailyForecast = {
    day?: string;
    minTemp?: number;
    maxTemp?: number;
    precipitation?: number;
    weather?: string;
    iconId?: number;
  };

export type ForecastWeather = {
  forecast: Array<DailyForecast>;
};

export type DailyForecastAPIResponse = {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: { Value: number},
    Maximum: { Value: number},
  },
  Day: {
    Icon: number,
    IconPhrase: string,
    PrecipitationProbability: number
  },
  Night: {
    Icon: number,
    IconPhrase: string,
    PrecipitationProbability: number
  },
  Sun: {
    Rise : string,
    Set: string
  }
}

export type ForecastAPIResponse = {
  DailyForecasts: Array<object>;
}