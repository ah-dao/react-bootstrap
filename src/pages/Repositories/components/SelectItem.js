import React from 'react'
import { Select } from 'antd'
import '../scss/SelectItem.scss'
import PropTypes from 'prop-types'

export default function SelectItem({
  label, options, setCur, onChangeSelect,
}) {
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
      onChange={(value) => {
        const temp = {}
        temp[label] = value
        temp.setCur = setCur
        onChangeSelect(temp)
      }}
      options={optionsArr}
    />
  )
}

SelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setCur: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
}
