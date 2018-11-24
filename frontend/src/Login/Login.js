import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadVideo, createProfile } from '../Api';
import { format } from 'util';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { profileName: '', profileDescription: '', profileType: 'startup' };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handeSubmit = this.handeSubmit.bind(this);
  }
  handleChangeName(event) {
    this.setState({ profileName: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ profileDescription: event.target.value });
  }
  onDrop = async (accepted, rejected) => {
    const profile = {
      name: this.state.profileName,
      description: this.state.profileDescription
    };
    const createdProfile = await uploadVideo(profile, accepted);
    const profileId = createdProfile._id;
    this.props.setProfileId(profileId);
  };
  async handeSubmit() {
    const profile = {
      name: this.state.profileName,
      description: this.state.profileDescription
    };
    const createdProfile = await createProfile(profile);
    const profileId = createdProfile._id;
    this.props.setProfileId(profileId);
  }
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
            { this.state.profileType === 'startup' && <label for="profileName">Startup Name:</label>}
            { this.state.profileType === 'investor' && <label for="profileName">Name:</label>}
            { this.state.profileType === 'company' && <label for="profileName">Company Name:</label>}
            <input
              className="form-control"
              id="profileName"
              type="text"
              value={this.state.profileName}
              onChange={this.handleChangeName}
            />
          </div>
          <div className="form-group">
            { this.state.profileType === 'startup' &&<label for="profileDescription">Tell us what you do:</label>}
            { this.state.profileType !== 'startup' &&<label for="profileDescription">Problem Description:</label>}
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
          { this.state.profileType === 'startup'
           &&
            <div>
              <div className="submitzone-text">Record your elevator pitch!</div>
              <Dropzone onDrop={this.onDrop} accept="video/mp4,video/x-m4v,video/*">
                <span>+</span>
              </Dropzone>
            </div>
          }
          { this.state.profileType !== 'startup' && <div><button className="btn btn-primary" onClick={this.handeSubmit}>Create!</button></div>}
        </div>
      </div>
    );
  }
}

export default Login;
