import React, { Component } from 'react';
import { Player } from 'video-react';
import '../../node_modules/video-react/dist/video-react.css';
import { getVideoUrl } from '../Api';
import Chat from './Chat';

const defaultLogoUrl = 'logo-placeholder.jpg';
const video = {
  path: "/uploads/example-video/SampleVideo_1280x720_1mb.mp4"
}

class ListItem extends Component {
  state = {
    toggleChat: false,
  }

  displayChat = () => {
    console.log('toggle chat!')
    this.setState({ toggleChat: !this.state.toggleChat });
  }

  render(){
    const { profile } = this.props;
    const { launchpadData = {}, description, industries, technologies } = profile;
    const { type, city, country, shortDescription, logo = {} } = launchpadData;
    const { toggleChat } = this.state;
    const shortened = description.length > 250 ? description.substring(0, 250) + '...' : description;
    const industryTags = industries.join(', ')
    const techTags = technologies.join(', ')

    return (
      <div className="profile-container">
        {/* { toggleChat && <Chat profile={profile} /> } */}
        <div className="profile-content">
          <div className="profile-logo-container">
            {video ? (
              <Player
                playsInline
                poster={logo.imageServiceUrl || defaultLogoUrl}
                src={getVideoUrl(video)}
              />
            ) : (
              <img
                className="profile-logo"
                src={logo.imageServiceUrl || defaultLogoUrl}
                alt={profile.name}
              />
            )}
          </div>
  
          <div className="profile-text">
            <h3>{profile.name}</h3>
            <p>
              {city}, {country}
            </p>
            <p>{shortened}</p>
            <p className="industrytaggs">{industryTags}</p>
            <p className="industrytaggs">{techTags}</p>
          </div>
          <div className="profile-button-container">
            <button className="profile-button" onClick={this.displayChat}>
              Say hello to {profile.name}!
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ListItem;
