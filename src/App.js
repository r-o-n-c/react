import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

//pages
import { Login } from './components/Login';
import { Users } from './components/Users';

function App() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Login />;
  }
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;