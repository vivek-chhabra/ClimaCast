import { BsFillSunriseFill, BsSunsetFill, BsSpeedometer2, BsThermometerHalf } from "react-icons/bs";
import { MdOutlineAir, MdVisibility } from "react-icons/md";
import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from "../../helpers/helpers";
import { useAppSelector } from "../../app/hooks";
import { WiHumidity } from "react-icons/wi";
import { NavLink } from "react-router-dom";
import { BiDroplet } from "react-icons/bi";
import { useState } from "react";
import "./Details.scss";

type Props = {};

export default function Details({}: Props) {
    const [loading, setLoading] = useState(true)
    const { data, error, success } = useAppSelector((state) => state.weather);
    const today = data?.list[0];

    setTimeout(() => {
        setLoading(false)
    }, 4000);

    return (
        <>
            {error && <h2>{error}</h2>}
            {success && data && today ? (
                <div className="Details">
                    <div className="top">
                        <h1>
                            {data?.name} <span>({data?.country})</span>
                        </h1>
                        {today?.main?.temp && <div className="temp">{Math.round(today?.main?.temp)}° C</div>}
                        <div className="info flex">
                            <p>
                                {today?.weather[0].main}, {today.weather[0].description}
                            </p>{" "}
                            |
                            <div className="HL">
                                H: {`${Math.ceil(today?.main?.temp_max)} \xB0C`} &nbsp; L: {`${Math.floor(today?.main?.temp_min)}\xB0 C`}
                            </div>
                        </div>
                        <div className="forecast">
                            {data.list.map((item, idx) => (
                                <div className="item" key={idx}>
                                    <p>{idx === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
                                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                                    <div className="temp">{`${Math.round(item?.main?.temp)}\xB0 C`}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bottom flex-col">
                        <div className="head">
                            <div className="h-item flex-col">
                                <BsFillSunriseFill />
                                {getSunTime(data.sunrise)}
                            </div>
                            <div className="h-item flex-col">
                                <BsSunsetFill />
                                {getSunTime(data.sunset)}
                            </div>
                        </div>
                        <div className="btm">
                            <div className="btm-item">
                                <div className="top flex">
                                    <MdOutlineAir />
                                    <p>Wind</p>
                                </div>
                                <div className="val">{Math.round(today.wind.speed)} Km/h</div>
                                <div className="description">{`${getWindDirection(Math.round(today.wind.deg))}, gusts ${today.wind.gust.toFixed(1)} Km/h`}</div>
                            </div>
                            <div className="btm-item">
                                <div className="top flex">
                                    <BsThermometerHalf />
                                    <p>Feels</p>
                                </div>
                                <div className="val">{`${Math.round(today?.main?.temp)}\xB0 C`}</div>
                                <div className="description">{`Feels ${Math.round(today.main.feels_like) > Math.round(today.main.temp) ? "colder" : "warmer"}`}</div>
                            </div>
                            <div className="btm-item">
                                <div className="top flex">
                                    <WiHumidity />
                                    <p>Humidity </p>
                                </div>
                                <div className="val">{today.main.humidity}%</div>
                                <div className="description">{getHumidityValue(today.main.humidity)}</div>
                            </div>
                            <div className="btm-item">
                                <div className="top flex">
                                    <BiDroplet />
                                    <p>Precipitation</p>
                                </div>
                                <div className="val">{Math.round(today.pop * 1000)}%</div>
                                <div className="description">
                                    {getPop(today.pop)}, clouds at {today.clouds.all}%
                                </div>
                            </div>
                            <div className="btm-item">
                                <div className="top flex">
                                    <BsSpeedometer2 />
                                    <p>Pressure</p>
                                </div>
                                <div className="val">{today.main.pressure} hPa</div>
                                <div className="description">{Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"} than standard</div>
                            </div>
                            <div className="btm-item">
                                <div className="top flex">
                                    <MdVisibility />
                                    <p>Visibility</p>
                                </div>
                                <div className="val">{(today.visibility / 1000).toFixed()} km</div>
                                <div className="description">{getVisibilityValue(today.visibility)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-col">
                    <NavLink to={"/"}>Back to Home Page</NavLink>
                    {loading ? <p>Loading...</p> : <p>Something went wrong</p>}
                </div>
            )}
        </>
    );
}
