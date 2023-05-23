import React from 'react'
import {
  Layout, Input, Button,
} from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import './scss/Header.scss'
import HeaderDropdown from './HeaderDropdown'

const { Search } = Input
export default function Header() {
  const { Header } = Layout
  const onSearch = (value) => console.log(value)
  const menu = [
    'Product',
    'Solutions',
    'Open Source',
  ]
  return (
    <Header className="header-class">
      <div className="header-container flex-class">
        <div className="header-icon">
          <GithubOutlined
            className="github-icon"
            style={
            {
              color: 'white',
              fontSize: '32px',
            }
          }
          />
        </div>
        <div className="header-menu-wrapper flex-class">
          <nav className="menu-nav">
            {
              menu.map((item, index) => <HeaderDropdown key={item} name={item} index={index} />)
            }
            <Button type="link" className="nav-button">Pricing</Button>
          </nav>
          <div className="text-left flex-class">
            <Search
              className="text-left-search"
              placeholder="Search"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
            <Button type="link">Sign in</Button>
            <Button className="text-left-button">Sign out</Button>
          </div>
        </div>

      </div>
    </Header>
  )
}
