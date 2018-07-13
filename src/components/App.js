import { ConnectedRouter } from 'connected-react-router'
import importedComponent from 'react-imported-component';
import { Provider } from 'react-redux'
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'components/Home';
import Loading from 'components/Loading';
import store, {history} from 'store';

const AsyncDynamicPAge = importedComponent(
  () => import(/* webpackChunkName:'DynamicPage' */ './DynamicPage'),
  {
    LoadingComponent: Loading
  }
);
const AsyncNoMatch = importedComponent(
  () => import(/* webpackChunkName:'NoMatch' */ './NoMatch'),
  {
    LoadingComponent: Loading
  }
);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dynamic" component={AsyncDynamicPAge} />
            <Route component={AsyncNoMatch} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
