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
      <div className="login-form">
        <h2>Who are you?</h2>
        <div>
          <button className={this.state.profileType === 'startup' ? "btn btn-primary login-button": "btn login-button"} onClick={() => this.setState({profileType: 'startup'})}>Startup</button>
          <button className={this.state.profileType === 'investor' ? "btn btn-primary login-button": "btn login-button"} onClick={() => this.setState({profileType: 'investor'})}>Investor</button>
          <button className={this.state.profileType === 'company' ? "btn btn-primary login-button": "btn login-button"} onClick={() => this.setState({profileType: 'company'})}>Company</button>
        </div>
        <form>
          <div className="form-group">
            <label for="profileName">Name:</label>
            <input
              className="form-control"
              id="profileName"
              type="text"
              value={this.state.profileName}
              onChange={this.handleChangeName}
            />
          </div>
          <div className="form-group">
            <label for="profileDescription">Problem Description:</label>
            <textarea
              rows="5"
              className="form-control"
              id="profileDescription"
              value={this.state.profileDescription}
              onChange={this.handleChangeDescription}
            />
          </div>
        </form>
        <div className="row submitzone">
          { this.state.profileType === 'startup' && <Dropzone onDrop={this.onDrop} accept="video/mp4,video/x-m4v,video/*" />}
          { this.state.profileType !== 'startup' && <div><button className="btn btn-primary" onClick={this.handeSubmit}>Create!</button></div>}
        </div>
      </div>
    );
  }
}

export default Login;
