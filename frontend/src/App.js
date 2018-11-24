import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login/Login';
import ListView from './List/ListView';
import openSocket from 'socket.io-client';
import './bootstrap/bootstrap.css';
import './App.css';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    const socket = openSocket('http://cloud.kurkinen.me:3001');
    setTimeout(() => {
      socket.emit('message', 'test message');
    }, 1000);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <div className="content">
            <Route exact path="/list" component={ListView} />
            <Route exact path="/login" component={Login} />
            <Link to="/list">
              <button>About</button>
            </Link>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
