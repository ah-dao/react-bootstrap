import React from 'react'
import {
  Layout, Dropdown, Space,
} from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'

import './Header.scss'

const items = [
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
export default function Header() {
  const { Header } = Layout
  const clickFuc = (e) => {
    e.preventDefault()
  }
  return (
    <Header className="header-class">
      <div className="header-container">
        <div className="logo" />
        <div className="header-menu-wrapper">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={clickFuc} role="menuitem" tabIndex={0}>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}
