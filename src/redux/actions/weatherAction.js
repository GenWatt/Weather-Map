import { FETCH_ERROR, FETCH_LAT_LNG_SUCCESS, FETCH_WEATHER } from "./types";
import axios from 'axios';

export const fetchWeather = () => async(dispatch) => {
    try {
        dispatch({ type: FETCH_WEATHER })
        const weather = await fetch("https://danepubliczne.imgw.pl/api/data/synop");
        const data = await weather.json();

        dispatch(fetchLatLng(data));
    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
    }
}

export const fetchLatLng = (items) => async(dispatch) => {

    const fullData = items.map(async(rest, index) => {
        if (index > 1) return
        try {
            const res = await axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_GEOLOCATION_API_KEY}&city=${rest.stacja}`);
            const { data } = res
            let output = {}

            if (data.results) {
                output = {...rest, location: {...data.results[0].locations[0].latLng } }
            }
            return output
        } catch (error) {
            dispatch({ type: FETCH_ERROR, payload: error })
        }
    })

    dispatch({ type: FETCH_LAT_LNG_SUCCESS, payload: await Promise.all(fullData) });
}