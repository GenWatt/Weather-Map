import React from "react";
import "./details.css";

export default function Details({ stationInfo }) {
  return (
    <section className="more-info-container">
      <h3 className="box">{stationInfo.stacja}</h3>
      <ul className="box details-list">
        <li className="details-list-item">
          <span className="details-label">Temperatura:</span>
          <span className="details-data">{stationInfo.temperatura}&deg;</span>
        </li>
        <li className="details-list-item">
          <span className="details-label">Ciśnienie:</span>
          <span className="details-data">{stationInfo.cisnienie} hPa</span>
        </li>
        <li className="details-list-item">
          <span className="details-label">Prędkość wiatru:</span>
          <span className="details-data">{stationInfo.predkosc_wiatru} m/s</span>
        </li>
        <li className="details-list-item">
          <span className="details-label">Data pomiaru:</span>
          <span className="details-data">{stationInfo.data_pomiaru}</span>
        </li>
        <li className="details-list-item">
          <span className="details-label">Suma opadu:</span>
          <span className="details-data">
            {stationInfo.suma_opadu} l/m<sup>2</sup>
          </span>
        </li>
      </ul>
    </section>
  );
}
