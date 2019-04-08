import React from 'react';
import { Link } from 'react-router-dom'
// import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <ul>
              <li><button className="button" onClick={this.logoutUser}>Logout</button></li>
            </ul>
        );
      } else {
        return (
            <ul>
              <li><Link class="button" to={'/signup'}>Signup</Link></li>
              <li><Link class="button" to={'/login'}>Login</Link></li>
            </ul>
        );
      }
  }

  render() {
      return (
        <nav id="navbar" >
            <h1 className="title" >Sumo</h1>
            { this.getLinks() }
        </nav>
      );
  }
}

export default NavBar;