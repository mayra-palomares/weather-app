export const getDayName = (date: Date): string => date.toLocaleDateString(undefined, { weekday: 'long' });
export const getCurrentDayName = () => getDayName(new Date());