import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom'
import DelivaryRoutesTable from './components/DelivaryRoutesTable';
import OptimizeRoutes from './components/OptimizeRoutes';
import { history } from './helpers'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={DelivaryRoutesTable} />
          <Route path="/optimize" component={OptimizeRoutes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
