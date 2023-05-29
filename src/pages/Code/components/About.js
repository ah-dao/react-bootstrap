import React from 'react'
import PropType from 'prop-types'
import {
  ReadOutlined, ForkOutlined, StarOutlined,
} from '@ant-design/icons'
import '../scss/About.scss'
import { Link } from 'react-router-dom'

export default function About({
  description, topics, starCount, watchCount, forkCount,
}) {
  return (
    <div className="code-about-class">
      <h2 className="mt-h4">About</h2>
      <p className="mt-p">{description}</p>
      <div className="topic-items">
        {
            topics.map((item) => <a key={item} className="topic-tag">{item}</a>)
        }
      </div>
      <div className="mt-item">
        <Link>
          <ReadOutlined />
          Readme
        </Link>
      </div>
      <div className="mt-item">
        <Link>
          <ReadOutlined />
          License
        </Link>
      </div>
      <div className="mt-item">
        <Link>
          <ReadOutlined />
          Code of conduct
        </Link>
      </div>
      <div className="mt-item">
        <Link>
          <StarOutlined />
          <strong>{`${starCount} `}</strong>
          <span>stars</span>
        </Link>
      </div>
      <div className="mt-item">
        <Link>
          <StarOutlined />
          <strong>{`${watchCount} `}</strong>
          <span>watching</span>
        </Link>
      </div>
      <div className="mt-item">
        <Link>
          <ForkOutlined />
          <strong>{`${forkCount} `}</strong>
          <span>forks</span>
        </Link>
      </div>
      <div className="mt-item">
        <Link>
          <span>Report repository</span>
        </Link>
      </div>
    </div>
  )
}
About.propTypes = {
  description: PropType.string.isRequired,
  topics: PropType.arrayOf(PropType.string).isRequired,
  starCount: PropType.number.isRequired,
  watchCount: PropType.number.isRequired,
  forkCount: PropType.number.isRequired,
}
