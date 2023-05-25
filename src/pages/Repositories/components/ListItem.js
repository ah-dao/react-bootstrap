import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  SmileTwoTone, VerifiedOutlined, ForkOutlined, StarOutlined, InfoCircleOutlined, NodeIndexOutlined,
} from '@ant-design/icons'

export default function ListItem({ item, username }) {
  const imageArrKey = ['language', 'license', 'forks_count', 'stargazers_count', 'open_issues_count', 'pull_request']
  // license pull_request 没有找到
  const imageArrLable = [<SmileTwoTone key="0" />, <VerifiedOutlined key="1" />, <ForkOutlined key="2" />,
    <StarOutlined key="3" />, <InfoCircleOutlined key="4" />, <NodeIndexOutlined key="5" />]
  const imageArr = []
  imageArrKey.forEach((key, index) => {
    if (item[key] !== undefined && item[key] !== null) {
      const temp = {
        label: index < imageArrLable.length && imageArrLable[index],
        value: typeof item[key] === 'object' ? item[key].name : item[key],
        name: key,
      }
      imageArr.push(temp)
    }
  })
  const getMonthStr = (month) => {
    switch (month) {
      case 0:
        return 'Jan'
      case 1:
        return 'Feb'
      case 2:
        return 'Mar'
      case 3:
        return 'Apr'
      case 4:
        return 'May'
      case 5:
        return 'Jun'
      case 6:
        return 'Jul'
      case 7:
        return 'Aug'
      case 8:
        return 'Sept'
      case 9:
        return 'Oct'
      case 10:
        return 'Nov'
      case 11:
        return 'Dec'
      default:
        return 'Jan'
    }
  }

  // 计算更新时间
  const calculateTime = (updateTime) => {
    const now = new Date()
    const current = new Date(updateTime)
    // 得到时间间距的总秒数
    const distance = (now.getTime() - current.getTime()) / 1000
    const day = Math.floor(distance / (24 * 60 * 60))
    // 返回小时
    if (day === 0) {
      const hour = Math.floor(distance / (60 * 60))
      const str = hour > 1 ? ' hours' : ' hour'
      return `${hour + str} ago`
    }
    // 返回天数
    if (day === 1) {
      return 'yesterday'
    }
    if (day < 7 && day > 1) {
      return `${day} days ago`
    }
    // 返回周数
    if (day >= 7 && day < 14) {
      return 'last week'
    }
    // 返回日期
    const year = now.getFullYear() === current.getFullYear() ? '' : `${current.getFullYear()}`
    const date = current.getDate()
    const month = getMonthStr(current.getMonth())
    return year ? `on ${month} ${date}, ${year}` : `on ${month} ${date}`
  }

  return (
    <li className="list-item">
      <div className="item-dom">
        <div className="flex-dom">
          <div className="flex-auto">
            <h3 className="wb-break-all">
              <Link to={`/content/${username}/${item.name}`}>
                { item.name }
              </Link>
              <span className="label Label--secondary">{ item.visibility }</span>
            </h3>
            <p className="wb-break-word">
              { item.description }
            </p>
            <div className="d-inline-flex">
              {
                item.topics.map((item) => <a key={item} className="topic-tag">{item}</a>)
              }
            </div>
          </div>
          <div className="flex-item">...</div>
        </div>
        <div className="image-dom">
          {
            imageArr.map((images) => (
              <span className="dom" key={images.name}>
                <span className="dom-label">
                  {images.label}
                </span>
                <span className="dom-text">
                  {images.value}
                </span>
              </span>
            ))
          }
          <span className="dom">
            { `Updated ${calculateTime(item.updated_at)}`}
          </span>
        </div>
      </div>
    </li>
  )
}
ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    forks_count: PropTypes.number.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    open_issues_count: PropTypes.number.isRequired,
    watchers_count: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
    visibility: PropTypes.string.isRequired,
    pushed_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.any,
    ]),
    license: PropTypes.oneOfType([
      PropTypes.any,
    ]),
    language: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.any,
    ]),
  }).isRequired,
  username: PropTypes.string.isRequired,
}
