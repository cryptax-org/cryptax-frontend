import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from 'routes';
import store, { history, persistor } from 'state/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              {routes.map(route => (
                <Route key={ route.path } { ...route } />
              ))}
            </Switch>
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
