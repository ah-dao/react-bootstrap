import {
  OverviewDefault, RepositoriesDefault, UserDefault, ContentDefault, CodeDefault, IssuesDefault,
  userLoader, repositoriesLoader, contentLoader, codeLoader,
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
        loader: repositoriesLoader,
        title: 'Repositories',
        isNav: true,
      },
    ],
  },
  {
    path: 'content/:owner/:repo',
    element: <ContentDefault />,
    loader: contentLoader,
    children: [
      {
        index: true,
        element: <CodeDefault />,
        title: 'Code',
        loader: codeLoader,
      },
      {
        path: 'issues',
        element: <IssuesDefault />,
        title: 'Issues',
      },
    ],
  },
]

export default routes
