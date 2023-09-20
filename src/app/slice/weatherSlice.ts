import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocList, WeatherInfo } from "../../types/types";
import axios from "axios";

interface InitialType {
    loading: boolean;
    error: string;
    data: WeatherInfo | null;
    success: boolean;
}

const initialState: InitialType = {
    loading: false,
    error: "",
    data: null,
    success: false,
};

export const fetchWeatherInfo = createAsyncThunk("weatherInfo/fetchWeatherInfo", async ({ name }: Omit<LocList, "state">) => {
    let res = await axios(`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${name}&appid=${import.meta.env.VITE_API_KEY}`);
    const forcastData: WeatherInfo = {
        ...res.data.city,
        list: res.data.list.slice(0, 16),
    };
    return forcastData;
});

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherInfo.pending, (state) => {
            state.error = "";
            state.loading = true;
            state.success = false;
        });
        builder.addCase(fetchWeatherInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(fetchWeatherInfo.rejected, (state, action) => {
            state.error = action.error.message || "Something went wrong";
            state.loading = false;
            state.success = false;
            state.data = null;
        });
    },
});

export const weatherReducer = weatherSlice.reducer;
