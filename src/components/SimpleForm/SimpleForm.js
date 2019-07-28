import React, { Component } from 'react';
import { Alert, Button, Card, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isAlpha, API_KEY, DEFAULT_TIMEOUT, WEB_URL } from '../../utils';
import * as localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { setup } from 'axios-cache-adapter';
import to from 'await-to-js';

class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      disableSubmit: false,
      feedback: null,
      isInvalid: false,
    };

    this.request = null;

    this.handleWordChange = this.handleWordChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.displayFeedback = this.displayFeedback.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await localforage.defineDriver(memoryDriver);
    const storage = localforage.createInstance({
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver,
      ],
      name: 'wordplay-cache',
    });

    this.request = setup({
      timeout: DEFAULT_TIMEOUT,
      cache: {
        exclude: { query: false },
        maxAge: 15 * 60 * 1000,
        readOnError: (err, req) => {
          return (
            err.message === 'Network Error' ||
            err.code === 'ECONNABORTED' ||
            err.response.status === 500);
        },
        clearOnStale: true, // for now, until the word list we use is finalized
        store: storage,
      },
    });
  }


  handleWordChange(event) {
    const { name, value, maxLength } = event.target;
    if (value.length === 0 || isAlpha(value)) {
      this.setState({
        [name]: value.substring(0, maxLength).toLowerCase(),
        isInvalid: false,
      });
    }
  }

  displayFeedback() {
    if (!this.state.feedback) {
      return null;
    } else {
      return (
        <Alert variant="danger" onClose={() => {
          this.setState({ isInvalid: false, feedback: null });
        }} dismissible>
          {this.state.feedback}
        </Alert>
      );
    }
  }

  validateInput() {
    const { word } = this.state;
    if (!word) {
      const feedback = 'Please fill out this field.';
      this.setState({ isInvalid: true, feedback });
      return false;
    }

    return true;
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.validateInput()) {
      return;
    }

    this.setState({ disableSubmit: true });
    const url = `${WEB_URL}${this.props.formRoute}?api_key=${API_KEY}&word=${this.state.word}`;
    const [err, response] = await to(this.request.get(url));
    if (null !== err) {
      // console.log(err);
      this.props.onError(err);
      this.setState({ disableSubmit: false });
      return;
    }

    // console.log(response.data); // temporary
    this.props.onResult(response.data);
    this.setState({ disableSubmit: false });
  }

  render() {
    return (
      <Card className="formCard border-0">
        <Card.Header>{this.props.formTitle}</Card.Header>
        <Card.Body style={{ padding: '.8rem' }}>
          {this.props.formDescription &&
          (<Card.Text>{this.props.formDescription}</Card.Text>)}
          <Form border="dark" onSubmit={this.handleSubmit}>
            {this.state.feedback && this.displayFeedback()}
            <Form.Row style={{ margin: 'auto' }}>
              <Form.Group as={Col} xs="7" controlId="word">
                <Form.Control
                  name="word"
                  className={this.state.isInvalid && 'is-invalid'}
                  maxLength="15"
                  type="text"
                  placeholder="Word"
                  value={this.state.word}
                  onChange={this.handleWordChange}/>
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
