import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Button } from 'antd'
import PropType from 'prop-types'
import {
  CodeOutlined, BookOutlined, ForkOutlined, StarOutlined,
} from '@ant-design/icons'
import '../scss/pageHeader.scss'

export default function PageHeader({
  owner, repo, forksCount, stargazersCount, visibility,
}) {
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
    // {
    //   label: (
    //     <NavLink
    //       to="issues"
    //     >
    //       Issues
    //     </NavLink>
    //   ),
    //   key: 'issues',
    //   icon: <InfoCircleOutlined />,
    // },
  ]
  const itemClick = ({ key }) => {
    setCurrent(key)
  }
  const upperAlpha = (str) => str.slice(0, 1).toUpperCase() + str.slice(1)
  return (
    <header className="page-head-class page-content-class">
      <div className="content-container">
        <div className="d-flex title-container">
          <div className="flex-auto">
            <div className="d-flex title-items">
              <BookOutlined />
              <span className="flex-self-stretch auther">
                <Link to={`/${owner}/repositories`}>{ owner }</Link>
              </span>
              <span className="flex-self-stretch mx">/</span>
              <span className="flex-self-stretch name">
                <a role="button">{repo}</a>
              </span>
              <span className="label Label--secondary content-label">{upperAlpha(visibility)}</span>
            </div>
          </div>
          <div className="repository-details-container">
            <ul className="d-md-inline pagehead-actions">
              <li>
                <Button className="page-head-button" icon={<ForkOutlined style={{ fontSize: '14px' }} />}>
                  Fork
                  <span className="repo-network-counter">
                    {forksCount}
                  </span>
                </Button>
              </li>
              <li>
                <Button className="page-head-button" icon={<StarOutlined style={{ fontSize: '14px' }} />}>
                  Star
                  <span className="repo-network-counter">
                    {stargazersCount}
                  </span>
                </Button>
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
PageHeader.propTypes = {
  owner: PropType.string.isRequired,
  repo: PropType.string.isRequired,
  forksCount: PropType.number.isRequired,
  stargazersCount: PropType.number.isRequired,
  visibility: PropType.string.isRequired,
}
