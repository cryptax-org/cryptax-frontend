import importedComponent from 'react-imported-component';

import { Home } from 'pages';
import { Spinner } from 'components';
import { withAuthentication } from 'enhancers';

const AsyncNoMatch = importedComponent(
  () => import('pages/no-match'),
  {
    LoadingComponent: Spinner
  }
);
const AsyncAboutPage = importedComponent(
  () => import('pages/about'),
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
const AsyncSignUpPage = importedComponent(
  () => import('pages/sign-up'),
  {
    LoadingComponent: Spinner
  }
);

const AsyncTransactionsPage = importedComponent(
  () => import('pages/transactions'),
  {
    LoadingComponent: Spinner
  }
);

const AsyncVerifyUserPage = importedComponent(
  () => import('pages/verify-user'),
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
    path: '/about',
    component: AsyncAboutPage,
    exact: true,
  },
  {
    path: '/login',
    component: AsyncLoginPage,
    exact: true,
  },
  {
    path: '/sign-up',
    component: AsyncSignUpPage,
    exact: true,
  },
  {
    path: '/transactions',
    component: withAuthentication(AsyncTransactionsPage),
    exact: true,
  },
  {
    path: '/verify-user/:userId/:token',
    component: AsyncVerifyUserPage,
    exact: true,
  },
  {
    path: '',
    component: AsyncNoMatch,
    exact: false,
  }
];

export default routes;
