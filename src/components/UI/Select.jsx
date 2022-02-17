import React from 'react'

export default function Select({ options, optionKeys, getValue, value, labelOptions, inputOptions }) {
  return (
    <>
      <label
        className={labelOptions.class && labelOptions.class}
        htmlFor={`select_${labelOptions.htmlFor && labelOptions.htmlFor}`}
      >
        {labelOptions.text && labelOptions.text}
      </label>
      <select
        className={`input search-input ${inputOptions.class && inputOptions.class}`}
        placeholder={inputOptions.placeholder && inputOptions.placeholder}
        name={`select_${labelOptions.htmlFor && labelOptions.htmlFor}`}
        id={`select_${labelOptions.htmlFor && labelOptions.htmlFor}`}
        onChange={(e) => getValue(e.target.value)}
        value={value}
      >
        {options.map(
          (data) =>
            data && (
              <option value={data[optionKeys.value]} className="city-option" key={data[optionKeys.id]}>
                {data[optionKeys.displayValue]}
              </option>
            )
        )}
      </select>
    </>
  )
}
