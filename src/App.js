import './App.css'
// 引入 ant design
import {
  Layout, theme,
} from 'antd'
import { Outlet } from 'react-router-dom'
import { HeaderDefault } from './components'
// import { useLoaderData } from 'react-router-dom'
// import routes from './router/routes'

function App() {
  const { Content, Footer } = Layout
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  // const navRoutes = routes.filter((route) => route.isNav === true)
  // function getItem(label, key, icon, children) {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //   }
  // }

  // const menuItems = navRoutes.map((route) => getItem(
  //   <NavLink to={route.path}>{route.title}</NavLink>,
  //   route.path,
  // ))

  return (
    <div className="App">
      <Layout className="layout">
        <HeaderDefault />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </div>
  )
}

export default App

export function loader(item) {
  return item
}
