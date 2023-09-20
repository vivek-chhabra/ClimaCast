import { fetchWeatherInfo } from "../../app/slice/weatherSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { LocList } from "../../types/types";
import React, { useState } from "react";
import axios from "axios";
import "./Search.scss";

type Props = {};

const LIMIT = 5;

export default function Search({}: Props): JSX.Element {
    const [query, setQuery] = useState<string>("");
    const [options, setOptions] = useState<[]>([]);
    const [selectedOption, setSelectedOption] = useState<LocList | {}>({});
    const [error, setError] = useState("");
    const [weatherInfo, setWeatherInfo] = useState<{}>({});

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClick = async (option: LocList) => {
        setQuery(`${option.name}, ${option.state}`);
        setSelectedOption(option);
        setOptions([]);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        const res = await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${LIMIT}&appid=${import.meta.env.VITE_API_KEY}`);
        setOptions(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ("lat" in selectedOption) {
            dispatch(fetchWeatherInfo({name: selectedOption.name}))
            setSelectedOption({});
            setError("");
            navigate('/weatherdetails')
        } else {
            setError("please select from the suggested options");
        }
    };

    return (
        <div className="Search">
            <h1>
                Clima<span>Cast</span>
            </h1>
            <p>Enter below the place you want to know the weather of or select an option from dropdown</p>
            {error && !("lat" in selectedOption) && <p className="error">{error}</p>}
            <form className="input" onSubmit={handleSubmit}>
                <input required type="text" value={query} onChange={handleChange} name="" id="" />
                <button>search</button>
            </form>
            {options.length > 0 && (
                <div className="list flex-col">
                    {options.map((option: LocList) => (
                        <div className="item" key={crypto.randomUUID()} onClick={() => handleClick({ name: option.name, state: option.state, lat: option.lat, lon: option.lon })}>
                            {option.name}, {option.state}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
