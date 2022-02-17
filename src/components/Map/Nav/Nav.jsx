import React, { useState, useCallback, useEffect, useRef } from 'react'
import Details from './Details/Details'
import './nav.css'

import { useMap } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { FETCH_ERROR } from '../../../redux/actions/types'
import { ZOOM_INTO } from '../../../constants'
import SearchBar from '../../UI/SearchBar'
import Select from '../../UI/Select'
import findItem from '../../../utilities/findItem'

const optionsKeys = {
  value: 'stacja',
  displayValue: 'stacja',
  id: 'id_stacji',
}

const INITIAL_STATION = 'Bielsko Biała'

export default function Nav({ station, setStation }) {
  const map = useMap()
  const weather = useSelector((state) => state.weather)
  const dispatch = useDispatch()
  const firstRender = useRef(false)
  //Take user to lat lng position
  const flyToLatLng = useCallback(
    (location, zoom) => location && zoom && map.flyTo([location.lat, location.lng], zoom),
    [map]
  )
  const [stationInfo, setStationInfo] = useState(null)

  //Search for station
  const handleSearchCity = useCallback(
    (e) => {
      e.preventDefault()

      if (stationInfo) {
        flyToLatLng(stationInfo.location, ZOOM_INTO)
      } else {
        //Error msg when station dosen't exist
        dispatch({ type: FETCH_ERROR, payload: { message: 'Stacja nie istnieje!' } })
      }
    },
    [stationInfo, dispatch, flyToLatLng]
  )

  const fillStation = useCallback(
    (result) => {
      if (result) {
        setStation(result.stacja)
        setStationInfo(result)
      }
    },
    [setStation]
  )

  const getStation = useCallback(
    (value) => {
      const item = findItem(weather.weatherData, 'stacja', value)

      fillStation(item)
    },
    [weather, fillStation]
  )

  useEffect(() => {
    if (!firstRender.current && weather.weatherData && weather) {
      getStation(INITIAL_STATION)
      firstRender.current = true
    }
  }, [getStation, weather])

  useEffect(() => {
    getStation(station)
  }, [station, getStation])

  return (
    <motion.nav className="nav-container" initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}>
      <form className="search-form" onSubmit={handleSearchCity}>
        <div className="box">
          <SearchBar
            value={station}
            getValue={getStation}
            labelOptions={{ text: 'Wyszukaj stację', html: 'station-name' }}
            inputOptions={{ placeholder: 'Wyszukaj' }}
          />
        </div>
        <div className="box">
          <Select
            getValue={getStation}
            value={station}
            setValue={setStation}
            options={weather.weatherData}
            optionKeys={optionsKeys}
            labelOptions={{ text: 'Lub wybierz', htmlFor: 'station', class: 'search-label' }}
            inputOptions={{ placeholder: 'Wybierz stację' }}
          />
          <button className="btn btn-submit">Zoom</button>
        </div>
      </form>

      {stationInfo && <Details stationInfo={stationInfo} />}
    </motion.nav>
  )
}
