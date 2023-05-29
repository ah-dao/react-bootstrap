import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useLoaderData } from 'react-router-dom'
import { getRepoContent } from '../../network'
import { BoxRow } from '../../components/BoxRow'

export async function loader({ params }) {
  const { '*': splat } = params
  let data = []
  const response = await getRepoContent({ owner: params.owner, repo: params.repo, path: splat })
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
  return { params, path: splat, data }
}

export default function CodeItem() {
  const { data } = useLoaderData()

  useEffect(() => {
  })
  return (
    <div>
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
                flag="codeitem"
              />
            ))
          }
        </div>
      </div>

    </div>
  )
}
