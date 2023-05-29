import React from 'react'
import PropType from 'prop-types'
import Icon, {
  FileOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './BoxRowScss.scss'

const dirImge = () => (
  <svg className="icon" viewBox="0 0 1260 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M1171.561026 157.538462H601.796923l-30.982564-96.098462A88.221538 88.221538 0 0 0 486.793846 0H88.746667A88.746667 88.746667 0 0 0 0 88.746667v846.506666a88.746667 88.746667 0 0 0 88.746667 88.746667h1082.814359A88.746667 88.746667 0 0 0 1260.307692 935.253333V246.285128A88.746667 88.746667 0 0 0 1171.561026 157.538462zM88.746667 157.538462V88.746667h398.047179L508.849231 157.538462z" fill="#54AEFF" />
  </svg>
)
function DirIcon(props) {
  return <Icon component={dirImge} {...props} />
}

export default function BoxRow({
  path, name, type, flag,
}) {
  const controlIcon = (temp) => {
    if (temp === 'dir') {
      return <DirIcon />
    } if (temp === 'file') {
      return <FileOutlined style={{ fontSize: '16px' }} />
    }
    return null
  }
  return (
    <div className="box-row">
      <div className="row-item item-file">
        {
          controlIcon(type)
        }
      </div>
      <div className="row-item">
        <span className="text-style">
          {
            flag === 'code' ? (
              // code 主页面需要先跳转到子页面
              <Link to={`path\\${path}`} state={{ path }}>
                {name}
              </Link>
            ) : (
              // codeitem 子页面则在该页面路由 path 的基础上接着 push 路由
              // 使用 * 匹配新 push 的路由
              <Link to={path} state={{ path }}>
                {name}
              </Link>
            )
          }
        </span>
      </div>
      <div className="row-item">
        <span className="text-style">
          ...
        </span>
      </div>
      <div className="row-item text-right">
        <span className="text-style">
          ...
        </span>
      </div>
    </div>
  )
}
BoxRow.propTypes = {
  path: PropType.string.isRequired,
  name: PropType.string.isRequired,
  type: PropType.string.isRequired,
  flag: PropType.string.isRequired,
}
