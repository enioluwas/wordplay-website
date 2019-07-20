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

    this.select = this.select.bind(this);
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
        Wordplay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={this.state.activeKey}>
            <Nav.Link eventKey="Advanced Search" onSelect={this.select}>Advanced Search</Nav.Link>
            <Nav.Link eventKey="Anagrams" onSelect={this.select}>Anagrams</Nav.Link>
            <Nav.Link eventKey="Words Within Word" onSelect={this.select}>Words Within Word</Nav.Link>
            <Nav.Link eventKey="Words With Letters" onSelect={this.select}>Words With Letters</Nav.Link>
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
