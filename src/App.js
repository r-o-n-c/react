import React, { useState } from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

//pages
import users from './pages/users';
import { Login } from './components/Login';

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken}/>
  }
  return (
    <Router>
      <Switch>
        <Route path="/users" component={users} />
      </Switch>
    </Router>
  );
}

export default App;
