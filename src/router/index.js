import {
  createBrowserRouter,
} from 'react-router-dom'
import App, { loader as appLoader } from '../App'
import routes from './routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes,
    loader: appLoader,
  },
])

export default router
