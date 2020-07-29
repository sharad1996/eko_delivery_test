import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import DeliveryRoutesTable from './components/DeliveryRoutesTable';
import OptimizeRoutes from './components/OptimizeRoutes';
import { Header } from './components/Header';
import { history } from './helpers';

function App() {
  return (
    <div className="App">
      <Header />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={DeliveryRoutesTable} />
          <Route path="/optimize" component={OptimizeRoutes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
