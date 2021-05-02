import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

//pages
import { Login } from './components/Login';
import { Users } from './components/Users';
import { UserDetails } from './components/UserDetails';
import { UserEdit } from './components/UserEdit';
import { UserCreate } from './components/UserCreate';

function App() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Login />;
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route path="/userDetails/:userId">
          <UserDetails />
        </Route>
        <Route path="/userEdit/:userId">
          <UserEdit />
        </Route>
        <Route path="/userCreate">
          <UserCreate />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;