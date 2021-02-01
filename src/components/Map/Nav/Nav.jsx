import React, { useState, useEffect, useCallback } from "react";
import Details from "./Details/Details";
import "./nav.css";

import { useMap } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FETCH_ERROR } from "../../../redux/actions/types";
import { ZOOM_INTO } from "../../../constants";

export default function Nav({ station, setStation }) {
  const map = useMap();
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  //Take user to lat lng position
  const flyToLatLng = (location, zoom) => location && zoom && map.flyTo([location.lat, location.lng], zoom);
  const [stationInfo, setStationInfo] = useState(null);
  //Returns searched station data
  const currentStationData = useCallback(
    (stationsData) =>
      stationsData.filter((data) => data && data.stacja.toLowerCase() === station.toLowerCase())[0],
    [station]
  );
  //Search for station
  const handleSearchCity = (e) => {
    if (e) e.preventDefault();

    if (weather.weatherData) {
      const stationData = currentStationData(weather.weatherData);

      flyToLatLng(stationData.location, ZOOM_INTO);
      setStationInfo(stationData);
    }
    //Error msg when station dosen't exist
    if (weather.weatherData.every((data) => data.stacja.toLowerCase() === station.toLowerCase()))
      dispatch({ type: FETCH_ERROR, payload: { message: "Stacja nie istnieje!" } });
  };

  useEffect(() => {
    setStationInfo(currentStationData(weather.weatherData));
  }, [station, currentStationData, weather.weatherData]);

  return (
    <motion.nav className="nav-container" initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}>
      <form className="search-form" onSubmit={(e) => handleSearchCity(e)}>
        <div className="box">
          <label className="search-label" htmlFor="station_name">
            Podaj Stację
          </label>
          <input
            className="input search-input"
            type="text"
            placeholder="Nazwa stacji"
            name="station_name"
            id="station_name"
            value={station}
            onChange={(e) => setStation(e.target.value)}
          />
        </div>
        <div className="box">
          <label className="search-label" htmlFor="select_station">
            Lub wybierz
          </label>
          <select
            className="input search-input"
            placeholder="Wybierz stację"
            name="select_station"
            id="select_station"
            onChange={(e) => setStation(e.target.value)}
            value={station}
          >
            {weather.weatherData.map(
              (data) =>
                data && (
                  <option value={data.stacja} className="city-option" key={data.id_stacji}>
                    {data.stacja}
                  </option>
                )
            )}
          </select>
          <button className="btn btn-submit">Zoom</button>
        </div>
      </form>

      {stationInfo && <Details stationInfo={stationInfo} />}
    </motion.nav>
  );
}
