import React, { Component } from 'react';
import { getProfiles } from '../Api';
import ListItem from './ListItem';
import VisibilitySensor from 'react-visibility-sensor';

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    // randomIndex = 1;
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
    profiles: []
  };

  componentDidMount = async () => {
    const profiles = await getProfiles();
    console.log(profiles);
    this.setState({
      profiles: shuffle(profiles)
    });
  };

  handleVisibility = (profile, index) => (isVisible) => {
    const { toggleProfile } = this.props;
    if (isVisible) {
      toggleProfile(index, profile.id);
    }
  }

  render() {
    const { profiles = [] } = this.state;
    const { toggleProfile } = this.props;

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
