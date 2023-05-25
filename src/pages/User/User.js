import React from 'react'
import { Outlet } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import { getUserInfo } from '../../network'

export async function loader({ params }) {
  const result = await getUserInfo(params)
  if (!result) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  return { data: result.data }
//   const contact = await getContact(params.contactId)
//   // 捕获数据获取失败错误
//   if (!contact) {
//     throw new Response('', {
//       status: 404,
//       statusText: 'Not Found',
//     })
//   }
//   return { contact }
}
export default function User() {
  return (
    <div>
      <PageHeader />
      <Outlet />
    </div>
  )
}
