import React from 'react'
import { Select } from 'antd'
import '../scss/SelectItem.scss'
import PropTypes from 'prop-types'

const handleChange = (value) => {
  console.log(`selected ${value}`)
}
export default function SelectItem({ label, options }) {
  const optionsArr = [
    {
      label,
      options,
    },
  ]
  return (
    <Select
      className="select-item-class"
      defaultValue={label}
      style={{
        width: 200,
      }}
      onChange={handleChange}
      options={optionsArr}
    />
  )
}

SelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
