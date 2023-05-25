import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Button } from 'antd'
import {
  InfoCircleOutlined, CodeOutlined, BookOutlined,
} from '@ant-design/icons'
import '../scss/pageHeader.scss'

export default function PageHeader() {
  const [current, setCurrent] = useState('code')
  const items = [
    {
      label: (
        <NavLink
          to=""
        >
          Code
        </NavLink>
      ),
      key: 'code',
      icon: <CodeOutlined />,
    },
    {
      label: (
        <NavLink
          to="issues"
        >
          Issues
        </NavLink>
      ),
      key: 'issues',
      icon: <InfoCircleOutlined />,
    },
  ]
  const itemClick = ({ key }) => {
    setCurrent(key)
  }
  return (
    <header className="page-head-class">
      <div className="content-container">
        <div className="d-flex title-container">
          <div className="flex-auto">
            <div className="d-flex title-items">
              <BookOutlined />
              <span className="flex-self-stretch auther">
                <Link>name</Link>
              </span>
              <span className="flex-self-stretch mx">/</span>
              <span className="flex-self-stretch name">
                <Link>repo</Link>
              </span>
              <span className="label Label--secondary content-label">Public</span>
            </div>
          </div>
          <div className="repository-details-container">
            <ul className="d-md-inline pagehead-actions">
              <li>
                <Button>Default Button</Button>
              </li>
              <li>
                <Button>Default Button</Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-lg content-container">
        <Menu
          className="page-head-menu"
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          onClick={itemClick}
        />
      </div>
    </header>
  )
}
