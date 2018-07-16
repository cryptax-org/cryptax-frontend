import importedComponent from 'react-imported-component';

import { Home } from 'pages';
import { Spinner } from 'components';

const AsyncNoMatch = importedComponent(
  () => import('pages/no-match'),
  {
    LoadingComponent: Spinner
  }
);
const AsyncLoginPage = importedComponent(
  () => import('pages/login'),
  {
    LoadingComponent: Spinner
  }
);

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    component: AsyncLoginPage,
    exact: true,
  },
  {
    path: '',
    component: AsyncNoMatch,
    exact: false,
  }
];

export default routes;
