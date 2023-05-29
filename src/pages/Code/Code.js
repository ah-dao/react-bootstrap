import React from 'react'
import './scss/Code.scss'
import '../../style/MarkDown.scss'
import { Button } from 'antd'
import {
  MenuOutlined,
} from '@ant-design/icons'
import { useLoaderData } from 'react-router-dom'
import { decode } from 'js-base64'
import { BoxRow } from '../../components/BoxRow'
import {
  getRepoContent, getARepo,
  getRepoReadme, mdRender,
} from '../../network'
import About from './components/About'
import SidebarItem from './components/SidebarItem'
import { stringToHTML } from '../../utils'

export async function loader({ params }) {
  // loader 请求仓库的详情
  const { owner, repo, path } = params
  const response = await getRepoContent(path !== null ? { owner, repo, path } : { owner, repo })
  // 请求仓库的文件列表
  let dataList = []
  if (response.status === 200 && response.data.length) {
    const dir = []
    const file = []
    response.data.forEach((item) => {
      if (item.type === 'dir') {
        dir.push(item)
      } else {
        file.push(item)
      }
    })
    dataList = [...dir, ...file]
  }
  // 仓库信息
  let data = null
  const repoResponse = await getARepo({ owner, repo })
  if (repoResponse.status === 200 && response.data.length) {
    data = repoResponse.data
  }
  // 获取该仓库的 readme
  const readmeRes = await getRepoReadme({ owner, repo })
  const decStr = decode(readmeRes.data.content) // base64 解码
  // 将 md 字符串转化为 html 字符串
  const renderRes = await mdRender({ text: decStr })
  const renderDom = stringToHTML(renderRes.data)
  console.log('dom', renderDom)
  const renderData = {
    __html: renderRes.data,
  }
  // const data = [
  //   {
  //     download_url: null,
  //     git_url: 'https://api.github.com/repos/octokit/action.js/git/trees/554208e4d7c75675589557738d159edd31984a47',
  //     html_url: 'https://github.com/octokit/action.js/tree/main/.github',
  //     name: '.github',
  //     path: '.github',
  //     sha: '554208e4d7c75675589557738d159edd31984a47',
  //     size: 0,
  //     type: 'dir',
  //     url: 'https://api.github.com/repos/octokit/action.js/contents/.github?ref=main',
  //   },
  //   {
  //     download_url: null,
  //     git_url: 'https://api.github.com/repos/octokit/action.js/git/trees/554208e4d7c75675589557738d159edd31984a47',
  //     html_url: 'https://github.com/octokit/action.js/tree/main/.github',
  //     name: 'gitignore',
  //     path: 'gitignore',
  //     sha: '554208e4d7c75675589557738d159edd31984a47',
  //     size: 0,
  //     type: 'file',
  //     url: 'https://api.github.com/repos/octokit/action.js/contents/.github?ref=main',
  //   },
  // ]
  return {
    dataList, params, data, renderData,
  }
}

export default function Code() {
  const { data, dataList, renderData } = useLoaderData()
  const itemList = ['Releases', 'Packages', 'Used by', 'Contributors', 'Languages']
  // const iframeTitle = 'unique'
  return (
    <div className="repo-content-pjax-container">
      <div className="repo-layout">
        <div className="layout-main">
          <div className="file-navigation">
            <Button className="branch-dropdown">Default Button</Button>
            <div className="flex-r">
              <Button className="to-file">Go To File</Button>
              <Button className="code-install">Default Button</Button>
            </div>
          </div>
          <div className="content-box">
            <div className="box-header">...</div>
            <div className="box-body">
              {
                dataList.map((item) => (
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
                  watchCount={data.watchers_count}
                  forkCount={data.forks_count}
                />
              </div>
            </div>
            {
              itemList.map((item) => (
                <div className="BorderGrid-row" key={item}>
                  <div className="BorderGrid-cell">
                    <SidebarItem name={item} />
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
