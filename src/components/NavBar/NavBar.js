import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../img/app-logo.svg';
import { Navbar, Nav } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: 'Advanced Search',
    };
  }

  select(page) {
    this.setState({ activeKey: page });
    this.props.navHandler(page);
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img src={logo}
            width="30"
            height ="30"
            className="d-inline-block align-top mr-2"
            alt="logo" />
        Playlist to Spotify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={this.state.activeKey}>
            <Nav.Link eventKey="Advanced Search" onSelect={this.select.bind(this)}>Advanced Search</Nav.Link>
            <Nav.Link eventKey="Anagrams" onSelect={this.select.bind(this)}>Anagrams</Nav.Link>
            <Nav.Link eventKey="Words Within Word" onSelect={this.select.bind(this)}>Words Within Word</Nav.Link>
            <Nav.Link eventKey="Words With Letters" onSelect={this.select.bind(this)}>Words With Letters</Nav.Link>
            <Nav.Link href="https://www.github.com/enioluwa23/wordplay-website" target="_blank">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  navHandler: PropTypes.func.isRequired,
};

export default NavBar;
