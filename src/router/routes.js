import {
  OverviewDefault, RepositoriesDefault, UserDefault,
  userLoader,
} from '../pages'

const routes = [
  {
    path: ':username',
    element: <UserDefault />,
    loader: userLoader,
    children: [
      {
        path: 'overview',
        element: <OverviewDefault />,
        title: 'Overview',
        isNav: true,
      },
      {
        index: true,
        path: 'repositories',
        element: <RepositoriesDefault />,
        title: 'Repositories',
        isNav: true,
      },
    ],
  },
]

export default routes
