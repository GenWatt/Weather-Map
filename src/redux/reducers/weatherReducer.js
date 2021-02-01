import { FETCH_ERROR, FETCH_WEATHER, FETCH_LAT_LNG_SUCCESS } from "../actions/types";

const initialState = {
    weatherData: [],
    isLoading: false,
    error: null,
}

export default function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ERROR:
            return {...state, isLoading: false, error: action.payload }

        case FETCH_WEATHER:
            return {...state, isLoading: true }

        case FETCH_LAT_LNG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                weatherData: action.payload
            }

        default:
            return state
    }
}