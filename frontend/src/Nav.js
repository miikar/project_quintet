import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

class Nav extends Component {
  state = {
    showSubNav: false,
  }

  toggleSubNav = () => {
    this.setState({ showSubNav: !this.state.showSubNav});
  }

  render() {
    const {showSubNav} = this.state;
    const showClassName = showSubNav ? 'show' : '';

    const {newMessages, newProfiles} = this.props;

    return (
      <header>
          <div className={`collapse ${showClassName}`} id="navbarHeader">
            <div className="container">
              <div className="row">
                <div className="col-sm-8 col-md-7 py-4">
                  <h4 className="text-white">About</h4>
                  <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                </div>
                <div className="col-sm-4 offset-md-1 py-4">
                  <h4 className="text-white">Contact</h4>
                  <ul className="list-unstyled">
                    <li><a href="https://www.twitter.com" className="text-white">Follow on Twitter</a></li>
                    <li><a href="https://www.facebook.com" className="text-white">Like on Facebook</a></li>
                    <li><a href="https://jotain.com" className="text-white">Email me</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar navbar-dark box-shadow">
            <div className="container d-flex justify-content-between">
              <div className="newProfiles">
                {newProfiles}
              </div>
                <Link to="/" className="navbar-brand d-flex align-items-center">
                  <strong>PitchIt!</strong>
                  <img className="main-logo" src={logo} />
                </Link>
              <Link to="/chat" className="newMessages">
                {newMessages}
              </Link>
            </div>
          </div>
        </header>
    );
  }
}

export default Nav;