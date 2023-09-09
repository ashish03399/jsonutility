import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import JsonUtility from "./components/JSON/JSONUtility";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/" name="" render={props => <JsonUtility {...props}/>}/>
          </Switch>
        </React.Suspense>
        <div >
          <a
            href="https://www.linkedin.com/in/ashish-bansal-b7236ba0/"
            target="_blank"
            rel="noreferrer noopener"
            style={{'display': 'flex', 'justify-content': 'center'}}
          >
            {"</>"} with 💛 by Ashish Bansal{" "}
          </a>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
