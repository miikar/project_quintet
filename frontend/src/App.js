import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login/Login';
import ListView from './List/ListView';
import openSocket from 'socket.io-client';
import './bootstrap/bootstrap.css';
import './App.css';
import Nav from './Nav';
import Chat from './Chat';

class App extends Component {
  state = {
    currentProfile: 0,
    highestIndex: 0,
    newMessages: 0,
    newProfiles: 10,
  }

  toggleProfile = (index, id) => {
    const {highestIndex, newProfiles} = this.state;
    if (index > highestIndex && newProfiles > 0) {
      this.setState({
        highestIndex: index,
        newProfiles: this.state.newProfiles - 1
      })
    }
  };

  render() {
    const {currentProfile, newMessages, newProfiles} = this.state;
    const x = this.toggleProfile;

    return (
      <Router>
        <div className="App">
          <Nav newProfiles={newProfiles} newMessages={newMessages} />
          <div className="content">
            <Route 
              exact path="/" 
              render={() => 
                <ListView toggleProfile={this.toggleProfile} />
            } />
            <Route exact path="/login" component={Login} />
            <Route exact path="/chat" component={Chat} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
