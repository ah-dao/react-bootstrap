import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import { getARepo } from '../../network'

export async function loader({ params }) {
  // loader 请求仓库的详情
  const { owner, repo } = params
  // 仓库信息
  let data = null
  const repoResponse = await getARepo({ owner, repo })
  if (repoResponse.status === 200 && repoResponse.data) {
    data = repoResponse.data
  }
  return { data, params }
}

export default function Content() {
  const { params, data } = useLoaderData()
  return (
    <div className="content-wrap">
      <PageHeader
        owner={params.owner}
        repo={params.repo}
        visibility={data.visibility}
        forksCount={data.forks_count}
        stargazersCount={data.stargazers_count}
      />
      <Outlet />
    </div>
  )
}
