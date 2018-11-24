import React, { Component } from 'react';
import { Player } from 'video-react';
import '../../node_modules/video-react/dist/video-react.css';
import { getVideoUrl } from '../Api';

// import TrackVisibility from 'react-on-screen';

/* 
    "type": "startup",
    "industries": [
      "on-demand_services"
    ],
    "_id": "5bf918a1f440ca2fed54caec",
    "name": "Taival Advisory Oy",
    "description": "Taival is delivering the next generation of business, strategy and technology advisory services. We believe a strong core team combined with a wide and deep ecosystem of partners can deliver leading-edge business and technology services to both corporations and start-up companies.",
    "launchpadData": {
      "type": "startup",
      "id": "4646512986423296",
      "name": "Taival Advisory Oy",
      "shortDescription": "Business & tech strategy co-creation services",
      "description": "Taival is delivering the next generation of business, strategy and technology advisory services. We believe a strong core team combined with a wide and deep ecosystem of partners can deliver leading-edge business and technology services to both corporations and start-up companies.",
      "founded": "2017-03-01T00:00:00.000Z",
      "website": "https://taival.com/",
      "city": "Espoo",
      "country": "Finland",
      "logo": {
        "id": "5087493250613248",
        "imageServiceUrl": "https://lh3.googleusercontent.com/DA3ZiQXlhU96Kjp3sEWu7Esm3xx6zTVMRUggVQ-iMr3wsjhTbbpnpKlHvXg-Voza83yLjnDyxbjUkjlERJNfUGmqU-Sze17jqiQs",
        "fileName": "taival_advisory.png"
      },
      "published": true,
      "industries": [
        "on-demand_services"
      ]
*/

const defaultLogoUrl = 'logo-placeholder.jpg';
const video = {
  path: "/uploads/example-video/SampleVideo_1280x720_1mb.mp4"
}

class ListItem extends Component{

  render(){
    const { profile } = this.props;
    const { launchpadData = {}, description } = profile;
    const { type, city, country, shortDescription, logo = {} } = launchpadData;
  
    return (
      <div className="profile-container">
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
            <p>{shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ListItem;
