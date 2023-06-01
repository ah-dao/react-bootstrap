import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useLoaderData } from 'react-router-dom'
import { getRepoContent } from '../../network'
import { BoxRow } from '../../components/BoxRow'
import '../Code/scss/Code.scss'
import FancyRoute from '../../utils/FancyRoute'

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

function CodeItem() {
  const { data } = useLoaderData()

  useEffect(() => {
  })
  return (
    <div className="repo-content-pjax-container">
      <div className="file-navigation">
        <Button className="branch-dropdown">Default Button</Button>
        {/* <div className="flex-r">
          <Button className="to-file">Go To File</Button>
          <Button className="code-install">Default Button</Button>
        </div> */}
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

export default FancyRoute(CodeItem)
