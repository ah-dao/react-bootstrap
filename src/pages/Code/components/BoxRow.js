import React from 'react'
import PropType from 'prop-types'

export default function BoxRow({ path, name, type }) {
  return (
    <div className="box-row">

      <span>{path}</span>
      <span>{name}</span>
      <span>{type}</span>
    </div>
  )
}
BoxRow.propTypes = {
  path: PropType.string.isRequired,
  name: PropType.string.isRequired,
  type: PropType.string.isRequired,
}
