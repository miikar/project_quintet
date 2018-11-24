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
    profileId: '',
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
  setProfileId = (id, history) => {
    this.setState({
      profileId: id
    })
    history.push('/')
  }

  render() {
    const {currentProfile, newMessages, newProfiles, profileId} = this.state;

    return (
      <Router>
        <div className="App">
          <Nav newProfiles={newProfiles} newMessages={newMessages} />
          <div className="content">
            <Route 
              exact path="/" 
              render={({history}) => 
                <ListView toggleProfile={this.toggleProfile} profileId={profileId} history={history} />
              } />
            <Route 
              exact path="/login" 
              render={({ history }) => 
                <Login setProfileId={(id) => {
                  this.setProfileId(id, history);
                }} />
            } />
            <Route 
              exact path="/chat" 
              render={() => 
                <Chat profileId={profileId} />
            } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
