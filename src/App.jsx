import React, { useEffect, useState } from "react";

import { fetchWeather } from "./redux/actions/weatherAction";
import { useSelector, useDispatch } from "react-redux";

import Error from "./components/Error/Error";
import Map from "./components/Map/Map";
import Preloader from "./components/Preloader/Preloader";

import "./App.css";
import { AnimatePresence } from "framer-motion";

function App() {
  const { isLoading, error } = useSelector((state) => ({
    isLoading: state.weather.isLoading,
    error: state.weather.error,
  }));
  const dispatch = useDispatch();
  const [isNavShow, setNav] = useState(false);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  return (
    <main>
      <button className="btn show-search-btn" onClick={() => setNav(!isNavShow)}>
        Wyszukaj
      </button>
      <AnimatePresence>{error && <Error error={error} />}</AnimatePresence>
      {isLoading && <Preloader />}
      <Map isNavShow={isNavShow} setNav={setNav} />
    </main>
  );
}

export default App;
