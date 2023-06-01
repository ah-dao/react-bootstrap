import React from 'react'
import PropType from 'prop-types'
import { Link } from 'react-router-dom'
import '../scss/About.scss'
import '../scss/SidebarItem.scss'
import { rdmRgbColor } from '../../../utils/index'

export default function SidebarItem({ name, itemProps }) {
  const { languageObj, contributorList } = itemProps
  // console.log('itemProps', itemProps)
  // 处理数据
  const dealLanguage = () => {
    let languageBar = []
    if (name === 'Languages' && languageObj) {
      let total = 0
      Object.keys(languageObj).forEach((item) => {
        total += languageObj[item]
      })
      languageBar = Object.keys(languageObj).map((item) => ({
        name: item,
        color: rdmRgbColor(),
        width: Math.floor((languageObj[item] / total) * 10000) / 100,
      }))
    }
    return languageBar
  }
  const dealRes = dealLanguage()
  const getItem = (name) => {
    switch (name) {
      case 'Languages':
        return (
          <div>
            <div className="language-bar">
              <span className="bar-item-wrap">
                {
                  dealRes.map((item) => (
                    <span
                      key={item.name}
                      style={
                        {
                          backgroundColor: item.color,
                          width: `${item.width}%`,
                        }
                      }
                      className="bar-item"
                    />
                  ))
                }
              </span>

              <span />
            </div>
            <ul className="language-list">
              {
                  dealRes.map((item) => (
                    <li
                      key={`${item.name}li`}
                      className="list-item"
                    >
                      <a className="list-link">
                        <span
                          style={{
                            backgroundColor: item.color,
                          }}
                          className="list-octicon"
                        />
                        <span className="list-fg">
                          {
                            item.name
                          }
                        </span>
                        <span>{ `${item.width}%` }</span>
                      </a>

                    </li>
                  ))
                }
            </ul>
          </div>
        )
      case 'Contributors':
        return (
          <div>
            <ul className="contributor-list">
              {contributorList.map((item, index) => (index < 11 ? (
                <li key={item.id} className="contributor-list-item">
                  <img
                    className="item-avatar"
                    src={item.avatar_url}
                    width="32"
                    height="32"
                    size="32"
                    alt="err"
                  />
                </li>
              ) : ''))}
            </ul>
            <div className="line">
              {
                (contributorList.length - 11) > 0 && `+ ${contributorList.length - 11} contributors`
              }
            </div>
          </div>
        )
      default:
        return (
          <span>
            {`${name} 这里什么也没有`}
          </span>
        )
    }
  }
  return (
    <div className="code-about-class">
      <h2 className="mt-h4 mt-item side-item-h2">
        <Link>
          { name }
        </Link>
      </h2>
      {
        getItem(name)
      }
    </div>
  )
}
SidebarItem.propTypes = {
  name: PropType.string.isRequired,
  itemProps: PropType.shape({
    languageObj: PropType.shape({}),
    contributorList: PropType.arrayOf(PropType.shape({})),
  }),
}
SidebarItem.defaultProps = {
  itemProps: {},
}
