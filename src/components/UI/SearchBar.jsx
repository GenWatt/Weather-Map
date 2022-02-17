import React, { useState, useEffect } from 'react'

export default function SearchBar({ getValue, value, labelOptions, inputOptions }) {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    getValue(value)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <>
      <label
        className={labelOptions.class ? labelOptions.class : 'search-label'}
        htmlFor={labelOptions.htmlFor && labelOptions.htmlFor}
      >
        {labelOptions.text && labelOptions.text}
      </label>
      <input
        className={`input search-input ${inputOptions.class && inputOptions.class}`}
        type="text"
        placeholder={inputOptions.placeholder && inputOptions.placeholder}
        name={labelOptions.htmlFor && labelOptions.htmlFor}
        id={labelOptions.htmlFor && labelOptions.htmlFor}
        value={inputValue}
        onChange={handleChange}
      />
    </>
  )
}
