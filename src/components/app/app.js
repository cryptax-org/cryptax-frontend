import { ConnectedRouter } from 'connected-react-router'
import importedComponent from 'react-imported-component';
import { Provider } from 'react-redux'
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'components/home';
import Spinner from 'components/spinner';
import store, {history} from 'store';

const AsyncNoMatch = importedComponent(
  () => import(/* webpackChunkName:'NoMatch' */ 'components/no-match'),
  {
    LoadingComponent: Spinner
  }
);
const AsyncLoginPage = importedComponent(
  () => import(/* webpackChunkName:'DynamicPage' */ 'components/login'),
  {
    LoadingComponent: Spinner
  }
);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={AsyncLoginPage} />
            <Route component={AsyncNoMatch} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
