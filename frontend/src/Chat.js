import React, { Component } from 'react';

class Chat extends Component {
  render() {
    console.log(this.props)
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