import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from 'routes';
import store, {history} from 'state/store';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            { routes.map( route => (
              <Route key={ route.path } { ...route } />
            ) ) }
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
