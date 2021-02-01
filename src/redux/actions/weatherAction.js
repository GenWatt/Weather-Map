import { FETCH_ERROR, FETCH_LAT_LNG_SUCCESS, FETCH_WEATHER } from "./types";

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

export const fetchLatLng = (data) => async(dispatch) => {

    const fullData = data.map(async(data, i) => {
        try {

            const res = await fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOLOCATION_API_KEY}&query=${data.stacja}`);
            const latlng = await res.json();

            if (latlng.data[0].latitude)
                return {...data, location: { lat: latlng.data[0].latitude, lng: latlng.data[0].longitude } }


        } catch (error) {
            dispatch({ type: FETCH_ERROR, payload: error })
        }
    })

    dispatch({ type: FETCH_LAT_LNG_SUCCESS, payload: await Promise.all(fullData) });
}