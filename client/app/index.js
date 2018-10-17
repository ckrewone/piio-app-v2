import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Register from './components/Register/Register'
import Home from './components/Home/Home';
import NewHome from './components/Home/NewHome';
import Login from './components/Login/Login';
import Info from './components/Info/Info';
import Details from './components/Info/Details';
import Room from './components/Account/Room';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path='/' component={NewHome}/>
        <Route path='/home' component={Home}/>
        <Route path='/log' component={Login}/>
        <Route path='/reg' component={Register}/>
        <Route path='/more' component={Info}/>
        <Route path='/moremore' component={Details}/>
        <Route path='/room/:id' component={Room}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
