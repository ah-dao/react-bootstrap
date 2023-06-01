import {
  OverviewDefault, RepositoriesDefault, UserDefault,
  ContentDefault, CodeDefault, IssuesDefault, CodeItemDefault,
  userLoader, repositoriesLoader, contentLoader, codeLoader, codeItemLoader,
} from '../pages'
import { loader as routeLoader } from '../utils/FancyRoute'

const routes = [
  {
    path: ':username',
    element: <UserDefault />,
    loader: userLoader,
    children: [
      {
        loader: routeLoader,
        children: [
          {
            path: 'overview',
            element: <OverviewDefault />,
            title: 'Overview',
            isNav: true,
          },
        ],
      },
      {
        loader: routeLoader,
        children: [
          {
            index: true,
            path: 'repositories',
            element: <RepositoriesDefault />,
            loader: repositoriesLoader,
            title: 'Repositories',
            isNav: true,
          },
        ],
      },
    ],
  },
  {
    path: 'content/:owner/:repo',
    element: <ContentDefault />,
    loader: contentLoader,
    children: [
      {
        loader: routeLoader,
        children: [
          {
            index: true,
            element: <CodeDefault />,
            title: 'Code',
            loader: codeLoader,
          },
        ],
      },
      {
        loader: routeLoader,
        children: [
          {
            element: <CodeItemDefault />,
            path: 'path/*',
            loader: codeItemLoader,
          },
        ],
      },
      {
        loader: routeLoader,
        children: [
          {
            path: 'issues',
            element: <IssuesDefault />,
            title: 'Issues',
          },
        ],
      },
    ],
  },
]

export default routes
