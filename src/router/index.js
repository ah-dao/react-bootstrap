import {
  createBrowserRouter,
} from 'react-router-dom'
import App, { loader as appLoader } from '../App'
import routes from './routes'
import FancyRoute, { loader as routeLoader } from './FancyRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    children: [
      {
        element: <FancyRoute />,
        children: routes,
        loader: routeLoader,
      },
    ],
  },
])

export default router
