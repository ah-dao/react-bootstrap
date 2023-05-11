import './App.css'
// 引入 ant design
import {
  Breadcrumb, Layout, Menu, theme,
} from 'antd'
// import { useLoaderData } from 'react-router-dom'
import { Outlet, NavLink } from 'react-router-dom'
import routes from './router/routes'

function App() {
  const { Header, Content, Footer } = Layout
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const navRoutes = routes.filter((route) => route.isNav === true)
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    }
  }

  const menuItems = navRoutes.map((route) => getItem(
    <NavLink to={route.path}>{route.title}</NavLink>,
    route.path,
  ))

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={menuItems}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
