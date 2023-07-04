import { WeatherIcon } from '../types/WeatherIcon';
import { DEFAULT_WEATHER_ICON, weatherImages} from './constants';

export const getWeatherImage = (iconId?: number):WeatherIcon => {
    return (iconId && weatherImages.find(img => img.id === iconId)) || DEFAULT_WEATHER_ICON;
}