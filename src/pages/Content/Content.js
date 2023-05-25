import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import PageHeader from './components/PageHeader'
// import { getRepoContent } from '../../network'

export async function loader({ params }) {
  // loader 请求仓库的详情
//   const { owner, repo } = params
//   const response = await getRepoContent({ owner, repo })
//   console.log('response', response)
// file list
  const data = [
    {
      download_url: null,
      git_url: 'https://api.github.com/repos/octokit/action.js/git/trees/554208e4d7c75675589557738d159edd31984a47',
      html_url: 'https://github.com/octokit/action.js/tree/main/.github',
      name: '.github',
      path: '.github',
      sha: '554208e4d7c75675589557738d159edd31984a47',
      size: 0,
      type: 'dir',
      url: 'https://api.github.com/repos/octokit/action.js/contents/.github?ref=main',
    },
    {
      download_url: null,
      git_url: 'https://api.github.com/repos/octokit/action.js/git/trees/554208e4d7c75675589557738d159edd31984a47',
      html_url: 'https://github.com/octokit/action.js/tree/main/.github',
      name: '.github',
      path: '.github',
      sha: '554208e4d7c75675589557738d159edd31984a47',
      size: 0,
      type: 'file',
      url: 'https://api.github.com/repos/octokit/action.js/contents/.github?ref=main',
    },
  ]
  return { data, params }
}

export default function Content() {
  const { params } = useLoaderData()
  console.log('params', params)
  return (
    <div className="content-wrap">
      <PageHeader />
      <Outlet />
    </div>
  )
}
