import React, { Component } from 'react';
import { url } from './Api';

import io from 'socket.io-client';

class Chat extends Component {
  socket = io(url);

  state = {
    message: '',
    messages : [{id: 0, content:'Say hello!'}],
  }

  componentDidMount() {
    this.socket.on('message', this.handleNewMessage);
  }

  handleNewMessage = (message) => {
    const { messages } = this.state; 
    this.setState({
      messages: [...messages, {id:1, content: message}]
    })
  }

  handleMessageInput = (event) => {
    this.setState({ message: event.target.value });
  }

  sendMessage = (event) => {
    event.preventDefault();
    const {message, messages} = this.state;
    this.socket.emit('message', message);
    this.setState({
      message: '', 
      messages: [...messages, {id:0, content: message}]
    });
  }

  render() {
    const {profile} = this.props;
    const {message, messages} = this.state;
    return (
      <div className="profile-chat">
        <div className="message-container">
          {messages.map((m) => (
            <div className={"message message-type-"+m.id}>
              {m.id === 1 && <span className="message-name">Them</span>}
              <span className="message-content">
                {m.content}
              </span>
              {m.id === 0 && <span className="message-name">You</span>}
            </div>
          ))}
        </div>
        <form className="message-input" onSubmit={this.sendMessage}>
          <div className="input-group mb-3">
            <input type="text" 
              autoFocus
              className="form-control" 
              placeholder="" 
              aria-label="..." 
              aria-describedby="basic-addon2"
              value={message} 
              onChange={this.handleMessageInput}
            />
            <div className="input-group-append">
              <button 
                className="btn btn-outline-primary"
                onClick={this.sendMessage} 
                type="submit"
                 value="Submit">Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Chat;