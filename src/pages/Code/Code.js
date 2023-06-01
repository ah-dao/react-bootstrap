import React, { useState } from 'react'
import './scss/Code.scss'
import '../../style/MarkDown.scss'
import { Button } from 'antd'
import {
  MenuOutlined, ForkOutlined, CaretDownOutlined,
} from '@ant-design/icons'
import { useLoaderData } from 'react-router-dom'
import { decode } from 'js-base64'
import { BoxRow } from '../../components/BoxRow'
import {
  resetRepoContent,
  getRepoReadme, mdRender,
} from '../../network'
import { getConcentrate } from '../../network/codeNetwork'
import About from './components/About'
import SidebarItem from './components/SidebarItem'
import SelectPop from './components/SelectPop'
import FancyRoute from '../../utils/FancyRoute'
// import { stringToHTML } from '../../utils'

export async function loader({ params }) {
  const { owner, repo } = params
  const {
    contentRes, repoRes, branchRes, LanguageRes, ContributorsRes,
  } = await getConcentrate({ owner, repo })

  // 处理文件列表
  let dataList = []
  if (contentRes.status === 200 && contentRes.data && contentRes.data.length) {
    const dir = []
    const file = []
    contentRes.data.forEach((item) => {
      if (item.type === 'dir') {
        dir.push(item)
      } else {
        file.push(item)
      }
    })
    dataList = [...dir, ...file]
  }
  // 处理仓库信息
  let data = null
  if (repoRes.status === 200 && repoRes.data) {
    data = repoRes.data
  }
  // 分支信息
  let branchList = []
  if (branchRes.status === 200 && branchRes.data) {
    branchList = branchRes.data
  }
  // 语言信息
  let languageObj = {}
  if (LanguageRes.status === 200 && LanguageRes.data) {
    languageObj = LanguageRes.data
  }
  // 贡献者信息
  let contributorList = []
  if (ContributorsRes.status === 200 && ContributorsRes.data) {
    contributorList = ContributorsRes.data
  }

  const readmeRes = await getRepoReadme({ owner, repo })
  const decStr = decode(readmeRes.data.content) // base64 解码
  // 将 md 字符串转化为 html 字符串
  const renderRes = await mdRender({ text: decStr })

  const renderData = {
    __html: renderRes.data,
  }
  return {
    params, dataList, data, renderData, branchList, languageObj, contributorList,
  }
}

const tagList = [{
  name: 'test',
}]
function Code() {
  const {
    params, dataList, data, renderData, branchList,
    languageObj, contributorList,
  } = useLoaderData()
  // 初始时的分支为默认分支
  const [currentBranch, setCurrentBranch] = useState(data.default_branch)
  const [btShow, setBtShow] = useState(false)
  const [showList, setShowList] = useState(dataList)
  const itemList = [
    {
      name: 'Releases',
      props: {},
      status: false,
      // 是否显示
    },
    {
      name: 'Packages',
      props: {},
      status: false,
    },
    {
      name: 'Used by',
      props: {},
      status: false,
    },
    {
      name: 'Contributors',
      props: {
        contributorList,
      },
      status: true,
    },
    {
      name: 'Languages',
      props: {
        languageObj,
      },
      status: true,
    },
  ]
  const controlBtDrop = () => {
    setBtShow(!btShow)
  }
  const changeBranch = async (branch) => {
    const temp = {
      owner: params.owner,
      repo: params.repo,
      path: params.path,
      ref: branch,
    }
    setCurrentBranch(branch)
    const res = await resetRepoContent(temp)
    if (res.status === 200) {
      setShowList(res.data)
    }
  }
  return (
    <div className="repo-content-pjax-container">
      <div className="repo-layout">
        <div className="layout-main">
          <div className="file-navigation">
            <div className="position-relative">
              <Button className="branch-dropdown" onClick={controlBtDrop}>
                <ForkOutlined />
                <span className="css-truncate-target">{ currentBranch }</span>
                <CaretDownOutlined />
              </Button>
              {
                btShow && (
                <SelectPop
                  branchList={branchList}
                  tagList={tagList}
                  defaultBranch={data.default_branch}
                  currentBranch={currentBranch}
                  controlBtDrop={controlBtDrop}
                  changeBranch={changeBranch}
                />
                )
              }
            </div>

            <div className="flex-r">
              <Button className="code-install">
                <span>Code</span>
                <CaretDownOutlined />
              </Button>
            </div>
          </div>
          <div className="content-box">
            <div className="box-header">...</div>
            <div className="box-body">
              {
                showList.map((item) => (
                  <BoxRow
                    key={item.path}
                    path={item.path}
                    name={item.name}
                    type={item.type}
                    flag="code"
                  />
                ))
              }
            </div>
          </div>
          <div className="readme-box">
            <div className="js-code-block-container" id="readme">
              <div className="md-header-sticky">
                <div className="header-item-flex">
                  <div className="menu-item">
                    <MenuOutlined className="menu-antion" />
                  </div>
                  <h2 className="readme-box-title">
                    <a href="#readme" className="Link--primary">README.md</a>
                  </h2>
                </div>
              </div>
              <div className="readme-box-body">
                {/* <iframe srcDoc={renderData} title={iframeTitle} /> */}
                <article className="markdown-body" dangerouslySetInnerHTML={renderData} />
              </div>
            </div>
          </div>
        </div>
        <div className="layout-sidebar">
          <div className="BorderGrid ">
            <div className="BorderGrid-row">
              <div className="BorderGrid-cell">
                <About
                  description={data.description}
                  topics={data.topics}
                  starCount={data.stargazers_count}
                  watchCount={data.subscribers_count}
                  forkCount={data.forks_count}
                />
              </div>
            </div>
            {
              itemList.map((item) => item.status && (
                <div className="BorderGrid-row" key={item.name}>
                  <div className="BorderGrid-cell">
                    <SidebarItem name={item.name} itemProps={item.props} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FancyRoute(Code)
