import React from 'react'
import { Outlet } from 'react-router-dom'
import PageHeader from './components/PageHeader'
// import { getUserRepo } from '../../network'

export async function loader({ params }) {
//   const data = await getUserRepo(params.username)
//   console.log('data', data)
  return { params }
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
//   const { username } = useLoaderData()
  return (
    <div>
      <PageHeader />
      <Outlet />
    </div>
  )
}
