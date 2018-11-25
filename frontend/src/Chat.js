import React, { Component } from 'react';
import { url } from './Api';

import io from 'socket.io-client';

class Chat extends Component {
  socket = io(url);

  constructor(props){
    super(props);
    this.state = {
      message: '',
      messages : props.messages,
    }
  }

  componentDidMount() {
    this.props.toggleMessages();
    this.socket.on('message', this.handleNewMessage);
  }

  componentWillUnmount(){
    this.props.toggleMessages();
  }

  handleNewMessage = (message) => {
    const { messages } = this.state; 
    const moreMessages = [...messages, {id:1, content: message}];
    localStorage.setItem('messages', JSON.stringify(moreMessages));
    this.setState({
      messages: moreMessages,
    });
    try {
      const container = document.getElementById("message-container");
      container.scrollTop = container.scrollHeight;
    } catch (e) {

    }
  }

  handleMessageInput = (event) => {
    this.setState({ message: event.target.value });
  }

  sendMessage = (event) => {
    event.preventDefault();
    const {message, messages} = this.state;
    this.socket.emit('message', message);
    const moreMessages = [...messages, {id:0, content: message}];
    localStorage.setItem('messages', JSON.stringify(moreMessages));
    this.setState({
      message: '', 
      messages: moreMessages,
    });
  }

  render() {
    const {profile} = this.props;
    const {message, messages} = this.state;
    return (
      <div className="profile-chat">
        <div className="message-container" id="message-container">
          {messages.map((m, index) => (
            <div className={"message message-type-"+m.id} key={m.content + index}>
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