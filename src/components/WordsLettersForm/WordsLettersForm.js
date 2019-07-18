import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import logo from '../../img/app-logo.svg';

export default class WordsLettersForm extends Component {
  render() {
    return (
      <Card border="dark" style={{ width: '18rem' }} className="text-center">
        <Card.Header >
          <Card.Img variant="top" src={logo} />
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Words With Letter
          </Card.Text>
          <Button variant="dark" href="/login" size="lg">
            <img src={logo}
              width="30"
              height ="30"
              className="d-inline-block align-top mr-3"
              alt="logo" />
          Login
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
