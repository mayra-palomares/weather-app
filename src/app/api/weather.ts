export async function getCurrentWeather() {
    const city: string = 'Lisboa,pt';
    const apiUrl: string = `${process.env.WEATHER_API_URL}/weather?units=metric&APPID=${process.env.WEATHER_API_KEY}&q=${city}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
}

export async function getForecastWeather() {
    const city: string = 'Lisboa,pt';
    const cnt: number = 4;
    const apiUrl: string = `${process.env.WEATHER_API_URL}/forecast?units=metric&APPID=${process.env.WEATHER_API_KEY}&cnt=${cnt}&q=${city}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
}