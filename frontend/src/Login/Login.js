import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadVideo } from '../Api';
import { format } from 'util';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { profileName: '', profileDescription: '' };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }
  handleChangeName(event) {
    this.setState({ profileName: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ profileDescription: event.target.value });
  }
  onDrop = (accepted, rejected) => {
    const profile = {
      name: this.state.profileName,
      description: this.state.profileDescription
    };
    uploadVideo(profile, accepted);
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <label>
          Name:
          <input
            type="text"
            value={this.state.profileName}
            onChange={this.handleChangeName}
          />
        </label>
        <label>
          Name:
          <input
            type="textarea"
            value={this.state.profileDescription}
            onChange={this.handleChangeDescription}
          />
        </label>
        <Dropzone onDrop={this.onDrop} accept="video/mp4,video/x-m4v,video/*" />
      </div>
    );
  }
}

export default Login;
