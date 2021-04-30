import React from 'react';
import './App.css';
import { Login} from './components/Login';

function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <Login/>
        </div>
      </div>
    </div>
  );
}

export default App;
