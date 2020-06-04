import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
// import Dashboard from "./containers/Dashboard/Dashboard";
import JsonUtility from "./components/JSON/JSONUtility";
import Dashboard from "./containers/Dashboard/Dashboard";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
// const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/500" name="" render={props => <Page500 {...props}/>} />
              <Route path="/json" name="" render={props => <JsonUtility {...props}/>} />
              <Route path="/" name="" render={props => <Dashboard {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
