import React, { useCallback, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useLoaderData } from 'react-router-dom'

import SelectItem from './components/SelectItem'
import ListItem from './components/ListItem'
import './scss/Repositories.scss'

import { getUserRepo } from '../../network'

// const { Search } = Input
export async function loader({ params }) {
  // 进入路由请求第一页
  const result = await getUserRepo({ username: params.username, page: 1 })
  if (!result) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  const { data } = result
  const nextPage = result.nextPage !== undefined ? result.nextPage : -1
  const lastPage = result.lastPage !== undefined ? result.lastPage : -1
  return {
    data, lastPage, nextPage, params,
  }
}
export default function Repositories() {
  // const onSearch = (value) => console.log(value)
  const { data, lastPage, params } = useLoaderData()
  const [searchParams] = useState(params)
  // 总数为总页数乘以每页数量
  const [total, setTotal] = useState(lastPage * 5)
  const [dataList, setDataList] = useState(data)
  const [curType, setCurType] = useState('owner')
  const [curPage, setCurPage] = useState(1)
  const [curSort, setCurSort] = useState('full_name')

  const selectArr = [
    {
      label: 'type',
      setCur: setCurType,
      options: [
        {
          label: 'all',
          value: 'all',
        },
        {
          label: 'owner',
          value: 'owner',
        },
        {
          label: 'member',
          value: 'member',
        },
      ],
    },
    {
      label: 'sort',
      setCur: setCurSort,
      options: [
        {
          label: 'full_name',
          value: 'full_name',
        },
        {
          label: 'created',
          value: 'created',
        },
        {
          label: 'updated',
          value: 'updated',
        },
        {
          label: 'pushed',
          value: 'pushed',
        },
      ],
    },
  ]
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a>
          <LeftOutlined />
          <span>Previous</span>
        </a>
      )
    }
    if (type === 'next') {
      return (
        <a>
          <span>Next</span>
          <RightOutlined />
        </a>
      )
    }
    return originalElement
  }
  const getSearchData = async (params) => {
    const result = await getUserRepo(params)
    if (!result) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    const { data, lastPage, nextPage } = result
    let newTotal = 0
    if (lastPage || nextPage) {
      newTotal = (lastPage || nextPage) * 5
    }
    setTotal(newTotal)
    setDataList(data)
  }
  const onChangeSelect = ({ setCur, type, sort }) => {
    // 重置状态
    setCur()
    const params = {
      ...searchParams,
      page: curPage,
      type: type || curType,
      sort: sort || curSort,
    }
    getSearchData(params)
  }
  const changePage = useCallback((page) => {
    setCurPage(page)
    const params = {
      ...searchParams,
      page,
      type: curType,
      sort: curSort,
    }
    getSearchData(params)
  })

  useEffect(() => {})
  return (
    <div className="repositories-container">
      <div className="search-bar">
        {/* <div className="search-input-wrap">
          <Search
            className="search-input"
            placeholder="Find a repository"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div> */}
        <div className="selet-items-wrap">
          {
            selectArr.map((item) => (
              <SelectItem
                label={item.label}
                options={item.options}
                key={item.label}
                setCur={item.setCur}
                onChangeSelect={onChangeSelect}
              />
            ))
          }
        </div>
      </div>
      <div className="repo-list-wrap">
        <ul className="repo-list">
          {
            dataList.map((item) => (
              <ListItem
                item={item}
                key={item.id}
                username={params.username}
              />
            ))
          }
        </ul>
      </div>
      <div className="paginate-container">
        <Pagination
          hideOnSinglePage
          defaultCurrent={1}
          total={total}
          onChange={changePage}
          showSizeChanger={false}
          defaultPageSize={5}
          itemRender={itemRender}
        />
      </div>
    </div>
  )
}
