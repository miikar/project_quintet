import React, { Component } from 'react';
import { url } from './Api';

import io from 'socket.io-client';

class Chat extends Component {
  socket = io(url);

  state = {
    message: '',
    messages : [{id: 0, content:'Message'}],
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
            <div className={"message type-"+m.id}>
              {m.content}
            </div>
          ))}
        </div>
        <form onSubmit={this.sendMessage}>
          <input type="text" value={message} onChange={this.handleMessageInput} />
          <button onClick={this.sendMessage} type="submit" value="Submit">Painike </button>
        </form>
      </div>
    );
  }
}

export default Chat;