import React, { useState } from 'react'
import Nav from './Nav/Nav'
import './map.css'

import { addGradient } from '../../utilities/gradients'
import { MOBILE_VIEW, POLAND_CORDS, ZOOM, ZOOM_MOBILE } from '../../constants'
import { useSelector } from 'react-redux'
import { Tooltip, GeoJSON, MapContainer, TileLayer, Marker } from 'react-leaflet'
import poland from '../../poland.json'
import { AnimatePresence } from 'framer-motion'

export default function Map({ isNavShow, setNav }) {
  //Get weather info
  const weather = useSelector((state) => state.weather)
  const [value, setValue] = useState('')
  //Take data when user clicked on marker and open nav
  const handleMarkerClick = (e) => {
    setNav(true)
    setValue(e.target.options.name)
  }

  return (
    <MapContainer
      className="map"
      center={POLAND_CORDS}
      zoom={window.innerWidth >= MOBILE_VIEW ? ZOOM : ZOOM_MOBILE}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={poland} />

      <AnimatePresence>{isNavShow && <Nav station={value} setStation={setValue} />}</AnimatePresence>

      {weather.weatherData.map((data) =>
        data && data.location ? (
          <Marker
            position={[data.location.lat, data.location.lng]}
            opacity={0}
            name={data.stacja}
            key={data.id_stacji}
            eventHandlers={{
              click: (e) => {
                handleMarkerClick(e)
              },
            }}
          >
            <Tooltip
              direction="top"
              offset={[-10, 20]}
              permanent
              className={'weather-info ' + addGradient(data.temperatura)}
            >
              <p>{data.temperatura}&deg;</p>
            </Tooltip>
          </Marker>
        ) : null
      )}
    </MapContainer>
  )
}
