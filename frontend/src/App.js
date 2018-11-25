import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login/Login';
import ListView from './List/ListView';
import './bootstrap/bootstrap.css';
import './App.css';
import Nav from './Nav';
import Chat from './Chat';
import io from 'socket.io-client';
import {url} from './Api';


class App extends Component {
  state = {
    profileId: '5bf981d04989b23da78f058b',
    currentProfile: 0,
    highestIndex: 0,
    newMessages: 0,
    messages: JSON.parse(localStorage.getItem('messages')) || [{id: 3, content:'Say hello!'}],
    inChat: false,
    newProfiles: 0,
  }

  socket = io(url);

  componentDidMount() {
    this.socket.on('message', this.handleNewMessage);
  }

  handleNewMessage = (message) => {
    const { messages, newMessages, inChat } = this.state;
    if (inChat) return;
    const moreMessages = [...messages, {id:1, content: message}];
    localStorage.setItem('messages', JSON.stringify(moreMessages));
    this.setState({
      messages: moreMessages,
      newMessages: newMessages + 1,
    })
  }

  toggleMessages = () => {
    if (this.state.inChat) {
      this.setState({
        messages: JSON.parse(localStorage.getItem('messages')) || [{id: 3, content:'Say hello!'}],
        inChat: !this.state.inChat,
      });
    } else {
      this.setState({
        newMessages: 0,
        inChat: !this.state.inChat,
      });
    }
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
      profileId: id,
      newProfiles: 10,
    })
    history.push('/')
  }

  render() {
    const {currentProfile, newMessages, newProfiles, profileId, messages} = this.state;

    return (
      <Router>
        <div className="App">
          <Nav profileId={profileId} newProfiles={newProfiles} newMessages={newMessages} />
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
                <Chat profileId={profileId} messages={messages} toggleMessages={this.toggleMessages} />
            } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
