import './App.css'
// 引入 ant design
import {
  Layout, theme,
} from 'antd'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { HeaderDefault } from './components'

function App() {
  const { Content, Footer } = Layout
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <div className="App">
      <Layout className="layout">
        <HeaderDefault />
        <Content>
          <div className="site-layout-content" style={{ background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>A little demo</Footer>
      </Layout>
      <ScrollRestoration />
    </div>
  )
}

export default App
