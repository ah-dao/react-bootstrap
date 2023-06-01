import React, { useEffect } from 'react'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export const loader = ({ params }) => {
  Nprogress.start()
  console.log('route loader')

  return { params }
}

function FancyRoute(WrapperCmp) {
  const res = (props) => {
    useEffect(() => {
      Nprogress.done()
    })
    return <WrapperCmp {...props} />
  }
  return res
}
export default FancyRoute
