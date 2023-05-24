import React, { useState, useLayoutEffect } from 'react'
import './PageHeader.scss'
import { NavLink, useLocation } from 'react-router-dom'
import {
  BookOutlined, HomeOutlined, UserOutlined,
} from '@ant-design/icons'
import { Menu, Avatar } from 'antd'

export default function PageHeader() {
  const [current, setCurrent] = useState('mail')
  const location = useLocation()

  const items = [
    {
      label: (
        <NavLink
          to="overview"
        >
          Overview
        </NavLink>
      ),
      key: 'overview',
      icon: <HomeOutlined />,
    },
    {
      label: (
        <NavLink
          to="repositories"
        >
          Repositories
        </NavLink>
      ),
      key: 'repositories',
      icon: <BookOutlined />,
    },
  ]
  useLayoutEffect(() => {
    const temp = location.pathname.split('/')
    setCurrent(temp[2])
  }, [location])
  return (
    <header className="page-head-class">
      <div className="container-lg">
        <h1 className="head-profile">
          <Avatar className="profile-image" shape="square" icon={<UserOutlined />} />
          <span className="profile-text">Username</span>
        </h1>
      </div>
      <div className="container-lg">
        <Menu className="page-head-menu" selectedKeys={[current]} mode="horizontal" items={items} />
      </div>
    </header>
  )
}
