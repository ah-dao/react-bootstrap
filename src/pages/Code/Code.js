import React from 'react'
import './scss/Code.scss'
import { Button } from 'antd'
import { useLoaderData } from 'react-router-dom'
import { BoxRow } from '../../components/BoxRow'
import { getRepoContent } from '../../network'

export async function loader({ params }) {
  // loader 请求仓库的详情
  const { owner, repo, path } = params
  const response = await getRepoContent(path !== null ? { owner, repo, path } : { owner, repo })
  let data = []
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
    data = [...dir, ...file]
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
  return { data, params }
}

export default function Code() {
  const { data } = useLoaderData()
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
                data.map((item) => (
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
        </div>
        <div className="layout-sidebar">..</div>
      </div>
    </div>
  )
}
