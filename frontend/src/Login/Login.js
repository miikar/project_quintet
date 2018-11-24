import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadVideo } from '../Api';
import { format } from 'util';

class Login extends Component {
  onDrop = (accepted, rejected) => {
    const profileId = '5bf918a1f440ca2fed54caed'; //Todo post profile first and then upload video
    uploadVideo(profileId, accepted);
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <Dropzone onDrop={this.onDrop} accept="video/mp4,video/x-m4v,video/*" />
      </div>
    );
  }
}

export default Login;
