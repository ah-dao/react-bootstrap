import React from 'react'
import PropType from 'prop-types'
import {
  CheckOutlined,
} from '@ant-design/icons'

export default function SelectPopItem({
  content, current, defaultBranch, changeBranch,
}) {
  return (
    <a
      role="button"
      tabIndex={0}
      className="SelectMenu-item"
      onClick={() => changeBranch(content)}
    >
      <CheckOutlined className={current ? 'selectMenu-item-check is-checked' : 'selectMenu-item-check'} />
      <span className="pop-item-content">{ content }</span>
      { content === defaultBranch && <span className="pop-item-default Label">default</span> }
    </a>
  )
}
// content item 内容
// current 当前选中
SelectPopItem.propTypes = {
  content: PropType.string,
  current: PropType.bool,
  defaultBranch: PropType.string,
  changeBranch: PropType.func.isRequired,
}
SelectPopItem.defaultProps = {
  content: 'test',
  current: false,
  defaultBranch: 'main',
}
