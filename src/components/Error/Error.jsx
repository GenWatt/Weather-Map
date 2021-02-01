import React, { useEffect, useState, useCallback } from "react";
import "./error.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { FETCH_ERROR } from "../../redux/actions/types";
import { MESSAGE_DEADLINE } from "../../constants";

export default function Error({ error }) {
  const [time, setTime] = useState(MESSAGE_DEADLINE / 1000);
  const dispatch = useDispatch();

  const handleCloseMessage = useCallback(() => dispatch({ type: FETCH_ERROR, payload: null }), [dispatch]);

  useEffect(() => {
    const timer = setTimeout(handleCloseMessage, MESSAGE_DEADLINE);
    const interval = setInterval(() => setTime((t) => t - 1), 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [handleCloseMessage]);
  return (
    <motion.aside className="error-box" initial={{ x: -400 }} animate={{ x: 0 }} exit={{ x: -400 }}>
      <button className="btn del" onClick={handleCloseMessage}>
        Zamknij({time})
      </button>
      <p className="message">{error.message}</p>
    </motion.aside>
  );
}
