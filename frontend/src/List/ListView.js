import React, { Component } from 'react';
import { getProfiles, getSimilarProfiles } from '../Api';
import ListItem from './ListItem';
import VisibilitySensor from 'react-visibility-sensor';

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    // randomIndex = 0;
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

class ListView extends Component {
  state = {
    profiles: [],
    showResults: false,
  };

  componentDidMount = async () => {
    if (!this.props.profileId) return this.props.history.push('/login');
    const profileToCompare = this.props.profileId;
    
    window.setTimeout(() => {
      console.log('timeout')
      this.setState({showResults: true})
    }, 2000)

    const profiles = await getSimilarProfiles(profileToCompare);

    this.setState({
      profiles
    });
  };

  showResults = () => {
    this.setState({showResults: true})
  }

  handleVisibility = (profile, index) => (isVisible) => {
    const { toggleProfile } = this.props;
    if (isVisible) {
      toggleProfile(index, profile.id);
    }
  }

  render() {
    const { profiles = [], showResults } = this.state;
    const { toggleProfile } = this.props;

    if (!showResults) return (
      <div className="loading-spinner">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        <div>Searching for the best match...</div>
      </div>
    )

    return (
      <div className="profile-list">
        {profiles.map((profile, index) => (
          <VisibilitySensor 
            onChange={this.handleVisibility(profile,index)}
            partialVisibility={true}
            intervalDelay={50}
            scrollDelay={100}
            >
            <ListItem 
              key={profile._id} 
              index={index}
              profile={profile} 
              toggleProfile={toggleProfile}
            />
          </VisibilitySensor >
        ))}
      </div>
    );
  }
}

export default ListView;
