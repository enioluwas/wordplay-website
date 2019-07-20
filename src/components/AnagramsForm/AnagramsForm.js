import React, { Component } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isAlpha, API_KEY } from '../../utils';
import axios from 'axios';
import to from 'await-to-js';

class AnagramsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      disableSubmit: false,
    };

    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWordChange(event) {
    if (event.target.value.length === 0 || isAlpha(event.target.value)) {
      this.setState({ word: event.target.value });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ disableSubmit: true });
    const word = this.state.word;
    const url = `https://www.wordplay-api.stream/get_anagrams?api_key=${API_KEY}&word=${word}`;
    const options = {
      url,
      timeout: 15000,
    };

    const [err, response] = await to(axios(options));
    if (null !== err) {
      console.error(err);
      return;
    }
    console.log(response.data);
    this.props.onResult(response.data);
    this.setState({ disableSubmit: false });
  }

  getResults() {

  }

  render() {
    return (
      <Card border="dark" className="formCard text-center">
        <Card.Header>Anagrams</Card.Header>
        <Card.Body>
          <Card.Text>Enter a word to find its anagrams.</Card.Text>
          <Form border="dark" onSubmit={this.handleSubmit}>
            <Form.Row style={{ margin: 'auto' }}>
              <Form.Group as={Col} xs="9" controlId="anagramsWord">
                <Form.Control
                  type="text"
                  placeholder="Word"
                  value={this.state.word}
                  onChange={this.handleWordChange}
                  required/>
              </Form.Group>
              <Form.Group as={Col} xs="3">
                <Button type="submit" variant="dark" disabled={this.state.disableSubmit}>Search</Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}


AnagramsForm.propTypes = {
  onResult: PropTypes.func.isRequired,
};

export default AnagramsForm;
