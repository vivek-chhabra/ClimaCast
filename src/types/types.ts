export interface LocList {
    name: string;
    state: string;
    lat?: number;
    lon?: number;
}

export type ForcastList = [
    {
        dt: number;
        main: {
            feels_like: number;
            humidity: number;
            pressure: number;
            temp: number;
            temp_max: number;
            temp_min: number;
        };
        weather: [
            {
                main: string;
                icon: string;
                description: string;
            }
        ];
        wind: {
            speed: number;
            gust: number;
            deg: number;
        };
        clouds: {
            all: number;
        };
        pop: number;
        visibility: number;
    }
];

export interface WeatherInfo {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
    list: ForcastList
}
