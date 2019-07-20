import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { isAlpha } from '../../utils';

class WordsWithinForm extends Component {
  constructor(props) {
    super(props);

    this.state = { word: '' };

    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWordChange(event) {
    if (event.target.value.length === 0 || isAlpha(event.target.value)) {
      this.setState({ word: event.target.value });
    }
  }

  handleSubmit(event) {
    const word = this.state.word;
    console.log(word);
  }

  displayResults() {

  }

  render() {
    return (
      <Card border="dark" className="formCard text-center">
        <Card.Header>Words Within Word</Card.Header>
        <Card.Body>
          <Card.Text>Enter a word to find the words within it.</Card.Text>
          <Form border="dark" onSubmit={this.handleSubmit}>
            <Form.Row style={{ margin: 'auto' }}>
              <Form.Group as={Col} xs="9" controlId="wWithinWord">
                <Form.Control
                  type="text"
                  placeholder="Word"
                  value={this.state.word}
                  onChange={this.handleWordChange}/>
              </Form.Group>
              <Form.Group as={Col} xs="3">
                <Button type="submit" variant="dark">Search</Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

WordsWithinForm.propTypes = {
  onResult: PropTypes.func.isRequired,
};

export default WordsWithinForm;
