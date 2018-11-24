import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
      <div className="profile-chat">
        Tämä on chätti
        <button onClick={this.props.hideChat} />
        <button onClick={this.props.hideChat} />
        <button onClick={this.props.hideChat} />
      </div>
    );
  }
}

export default Chat;