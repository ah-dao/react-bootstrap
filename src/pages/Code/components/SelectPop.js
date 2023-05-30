import React, { useEffect, useState } from 'react'
import '../scss/SelectPop.scss'
import { Button, Tabs } from 'antd'
import {
  CloseCircleOutlined,
} from '@ant-design/icons'
import PropType from 'prop-types'
import SelectPopItem from './SelectPopItem'

export default function SelectPop({
  branchList, tagList, currentBranch, currentTag,
  defaultBranch, controlBtDrop, changeBranch,
}) {
  const onChange = (key) => {
    console.log(key)
  }
  const [branchShow, setBranchShow] = useState(branchList)
  useEffect(() => {
    const protect = []
    const unProtect = []
    branchList.forEach((item) => {
      if (item.protected) {
        protect.push(item)
      } else {
        unProtect.push(item)
      }
    })
    setBranchShow([...protect, ...unProtect])
  }, [branchList])

  const tabItems = [
    {
      label: 'Branches',
      key: 'Branches',
      children: (
        <div className="SelectMenu-list ">
          <div className="List-wrap-1">
            <div className="List-wrap-2">
              {
                branchShow.map((item) => (
                  <SelectPopItem
                    key={item.name}
                    current={item.name === currentBranch}
                    content={item.name}
                    changeBranch={changeBranch}
                  />
                ))
              }
            </div>
          </div>

        </div>
      ),
    },
    {
      label: 'Tags',
      key: 'Tags',
      children: (
        <div className="SelectMenu-list ">
          {
            tagList.map((item) => (
              <SelectPopItem
                key={item.name}
                current={item.name === currentTag}
                defaultBranch={defaultBranch}
                changeBranch={() => {}}
              />
            ))
          }
        </div>
      ),
    },
  ]
  return (
    <div className="select-menu">
      <div className="SelectMenu-modal">
        <header className="SelectMenu-header">
          <span className="SelectMenu-title">
            Switch branches/tags
          </span>
          <Button className="SelectMenu-closeButton" onClick={controlBtDrop}>
            <CloseCircleOutlined />
          </Button>
        </header>
        <div className="SelectMenu-body">
          <Tabs
            onChange={onChange}
            type="card"
            items={tabItems}
          />
        </div>
      </div>
    </div>
  )
}
SelectPop.propTypes = {
  branchList: PropType.arrayOf(PropType.shape({})).isRequired,
  tagList: PropType.arrayOf(PropType.shape({})).isRequired,
  currentBranch: PropType.string,
  currentTag: PropType.string,
  defaultBranch: PropType.string,
  controlBtDrop: PropType.func.isRequired,
  changeBranch: PropType.func.isRequired,
}
SelectPop.defaultProps = {
  currentBranch: '',
  currentTag: '',
  defaultBranch: 'main',
}
