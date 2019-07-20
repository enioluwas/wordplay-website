import React, { Component } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isAlpha } from '../../utils';

class WordsLettersForm extends Component {
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

  getResults() {

  }

  render() {
    return (
      <Card border="dark" className="formCard text-center">
        <Card.Header>Words With Letters</Card.Header>
        <Card.Body>
          <Card.Text>Enter letters to find the words you can make with them.</Card.Text>
          <Form border="dark" onSubmit={this.handleSubmit}>
            <Form.Row style={{ margin: 'auto' }}>
              <Form.Group as={Col} xs="9" controlId="wwletterWord">
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

WordsLettersForm.propTypes = {
  onResult: PropTypes.func.isRequired,
};

export default WordsLettersForm;

