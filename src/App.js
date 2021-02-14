import './App.css';
import React from "react";
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';

import {AuthProvider} from './Context'
import routes from "./Routing/routes";

function App() {
    const routeComponents = routes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />);

  return (
      <AuthProvider>
          <Router>
              {routeComponents}
          </Router>
      </AuthProvider>
  );
}
export default App;



