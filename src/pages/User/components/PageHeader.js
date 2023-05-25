import React, { useState, useLayoutEffect } from 'react'
import '../scss/PageHeader.scss'
import { NavLink, useLocation, useLoaderData } from 'react-router-dom'
import {
  BookOutlined, HomeOutlined,
} from '@ant-design/icons'
import { Menu, Avatar } from 'antd'

export default function PageHeader() {
  const [current, setCurrent] = useState('overview')
  const location = useLocation()
  const { data } = useLoaderData()
  const [userData] = useState(data)

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
      <div className="container-lg user-container">
        <h1 className="head-profile">
          <Avatar className="profile-image" shape="square" src={userData.avatar_url} />
          <span className="profile-text">{userData.login}</span>
        </h1>
      </div>
      <div className="container-lg user-container">
        <Menu className="page-head-menu" selectedKeys={[current]} mode="horizontal" items={items} />
      </div>
    </header>
  )
}
