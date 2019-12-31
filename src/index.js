import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/reset.less';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.css'
import {Provider} from 'react-redux'
import store from './redux/store'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Login from "./pages/login"
import Admin from "./pages/admin"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);


