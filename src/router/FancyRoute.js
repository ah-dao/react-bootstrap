import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export const loader = ({ params }) => {
  Nprogress.start()

  return { params }
}
function FancyRoute() {
  useEffect(() => {
    Nprogress.done()
    return () => { Nprogress.start() }
  })

  return (
    <Outlet />
  )
}
export default FancyRoute
