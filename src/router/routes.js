import { DashboardDefault, CompaniesDefault } from '../pages'

const routes = [
  {
    path: 'dashboard',
    element: <DashboardDefault />,
    title: 'Dashboard',
    isNav: true,
  },
  {
    path: 'companies',
    element: <CompaniesDefault />,
    title: 'Companies',
    isNav: true,
  },
]

export default routes
