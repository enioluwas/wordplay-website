import React, { Component } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isAlpha, API_KEY } from '../../utils';
import axios from 'axios';
import to from 'await-to-js';

class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { word: '', disableSubmit: false };
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mockResult = this.mockResult.bind(this);
  }

  handleWordChange(event) {
    const { name, value, maxLength } = event.target;
    if (value.length === 0 || isAlpha(value)) {
      this.setState({ [name]: value.substring(0, maxLength) });
    }
  }

  mockResult(event) {
    event.preventDefault();
    this.props.onResult(['and', 'anda', 'adnad', 'mock', 'mockery', 'investigation']);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ disableSubmit: true });
    let url = 'https://www.wordplay-api.stream/';
    url = `${url}${this.props.formRoute}?api_key=${API_KEY}&word=${this.state.word}`;
    const options = {
      url,
      timeout: 15000,
    };

    const [err, response] = await to(axios(options));
    if (null !== err) {
      console.log(err); // temporary
      this.props.onError(err);
      this.setState({ disableSubmit: false });
      return;
    }

    console.log(response.data); // temporary
    this.props.onResult(response.data);
    this.setState({ disableSubmit: false });
  }

  render() {
    return (
      <Card className="formCard border-0">
        <Card.Header>{this.props.formTitle}</Card.Header>
        <Card.Body>
          {this.props.formDescription &&
          (<Card.Text>{this.props.formDescription}</Card.Text>)}
          <Form border="dark" onSubmit={this.mockResult}>
            <Form.Row style={{ margin: 'auto' }}>
              <Form.Group as={Col} xs="7" controlId="word">
                <Form.Control
                  name="word"
                  maxLength="15"
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


SimpleForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formDescription: PropTypes.string,
  formRoute: PropTypes.string.isRequired,
  onResult: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default SimpleForm;
