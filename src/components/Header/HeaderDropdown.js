import React from 'react'
import {
  Dropdown, Space,
} from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'

import PropTypes from 'prop-types'
import './scss/HeaderDropdown.scss'

const defaultItem = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
]
export default function HeaderDropdown({ name, items, index }) {
  const clickFuc = (e) => {
    e.preventDefault()
  }
  return (
    <Dropdown
      className="drop-down-item"
      menu={{
        items,
      }}
    >
      <a onClick={clickFuc} role="menuitem" tabIndex={index}>
        <Space>
          { name }
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}
HeaderDropdown.propTypes = {
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  index: PropTypes.number.isRequired,
}
HeaderDropdown.defaultProps = {
  name: 'Product',
  items: defaultItem,
}
