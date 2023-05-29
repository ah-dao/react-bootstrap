import React from 'react'
import PropType from 'prop-types'
import { Link } from 'react-router-dom'
import '../scss/About.scss'
import '../scss/SidebarItem.scss'

export default function SidebarItem({ name, ...props }) {
  console.log('props', props)
  return (
    <div className="code-about-class">
      <h2 className="mt-h4 mt-item side-item-h2">
        <Link>
          { name }
        </Link>
      </h2>
      {/* <div className="mt-item">
        <Link>
          <ReadOutlined />
          Readme
        </Link>
      </div>
      <div className="mt-item">
        <Link>
          <span>Report repository</span>
        </Link>
      </div> */}
    </div>
  )
}
SidebarItem.propTypes = {
  name: PropType.string.isRequired,
  props: PropType.shape({}),
}
SidebarItem.defaultProps = {
  props: {},
}
