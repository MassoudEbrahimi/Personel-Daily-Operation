import React, { Component } from 'react';
import Login from './Component/Login/Login'
import './App.css';
import "./Component/Login/Login.css"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard/Dashboard';



class App extends Component {
  state = {}
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" component={Login} /> */}
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;