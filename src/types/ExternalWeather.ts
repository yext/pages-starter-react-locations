export interface ExternalWeather {
  current_weather?: {
    time: string;
    temperature: number;
    weathercode: number;
    windspeed: number;
    winddirection: number;
  };
}
