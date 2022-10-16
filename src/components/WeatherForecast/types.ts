export interface Forecast {
    dt_txt: string;
    dt: number;
    weather: Array<{id:number}>;
    main: {
        temp_max: number;
        temp_min: number;
    }
}