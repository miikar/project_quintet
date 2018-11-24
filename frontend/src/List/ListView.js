import React, { Component } from 'react';
import { getProfiles } from '../Api';
import ListItem from './ListItem';

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
  render() {
    const { profiles = [] } = this.state;

    return (
      <div className="profile-list">
        {profiles.map(profile => (
          <ListItem key={profile._id} profile={profile} />
        ))}
      </div>
    );
  }
}

export default ListView;
