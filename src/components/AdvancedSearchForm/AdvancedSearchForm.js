import React, { Component } from 'react';
import { Button, Card, Col, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isAlpha, isNumeric } from '../../utils';
// import axios from 'axios';

class AdvancedSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beginsWith: '',
      endsWith: '',
      contains: '',
      containsAtLetter: '',
      containsAtIndex: '',
      size: '',
      disableSubmit: false,
    };

    this.handleAlphaInputChange = this.handleAlphaInputChange.bind(this);
    this.handleNumericInputChange = this.handleNumericInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAlphaInputChange(event) {
    const { name, value, maxLength } = event.target;
    if (value.length === 0 || isAlpha(value)) {
      this.setState({ [name]: value.substring(0, maxLength) });
    }
  }

  handleNumericInputChange(event) {
    const { name, value, maxLength } = event.target;
    let mutableValue = ` ${value}`.slice(1);
    if (mutableValue.length === 0) {
      this.setState({ [name]: mutableValue });
      return;
    } else if (isNumeric(mutableValue)) {
      if (mutableValue.charAt(0) === '0') {
        mutableValue = '';
      } else if (mutableValue.charAt(0) === '1') {
        if (parseInt(mutableValue) > 15) {
          mutableValue = mutableValue.substr(0, mutableValue.length - 1);
        }
      } else {
        mutableValue = mutableValue.charAt(0);
      }

      this.setState({ [name]: mutableValue.substring(0, maxLength) });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ disableSubmit: true });
    const word = this.state.word;
    console.log(word);
    this.setState({ disableSubmit: false });
  }

  getResults() {

  }

  render() {
    return (
      <Card border="dark" className="formCard">
        <Card.Header className="text-center">
        Advanced Search
        </Card.Header>
        <Card.Body>
          <Card.Text>Fill in the criteria below to find words.</Card.Text>
          <Form border="dark">
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Begins With</Form.Label>
                <Form.Control
                  name="beginsWith"
                  type="text"
                  placeholder="e.g pre"
                  maxLength="15"
                  value={this.state.beginsWith}
                  onChange={this.handleAlphaInputChange}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Ends With</Form.Label>
                <Form.Control
                  name="endsWith"
                  type="text"
                  placeholder="e.g son"
                  maxLength="15"
                  value={this.state.endsWith}
                  onChange={this.handleAlphaInputChange}/>
              </Form.Group>
              <Form.Group as={Col} xs={3}>
                <Form.Label>Size</Form.Label>
                <Form.Control
                  name="size"
                  type="text"
                  placeholder="1-15"
                  maxLength="2"
                  value={this.state.size}
                  onChange={this.handleNumericInputChange}/>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Contains</Form.Label>
              <InputGroup>
                <Form.Control
                  name="contains"
                  type="text"
                  placeholder="e.g ere"
                  maxLength="15"
                  value={this.state.contains}
                  onChange={this.handleAlphaInputChange}/>
                <InputGroup.Append>
                  <Button variant="outline-success" className="addButton"><strong>+</strong></Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contains</Form.Label>
              <Form.Row style={{ margin: 'auto' }}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ maxWidth: '7rem' }}>
                      <small>Letter</small>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="containsAtLetter"
                    type="text"
                    placeholder="A-Z"
                    maxLength="1"
                    className="lbShort"
                    value={this.state.containsAtLetter}
                    onChange={this.handleAlphaInputChange}/>
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ maxWidth: '7rem' }} className="border-left">
                      <small>At Index</small>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="containsAtIndex"
                    type="text"
                    placeholder="1-15"
                    maxLength="2"
                    className="lbShort"
                    value={this.state.containsAtIndex}
                    onChange={this.handleNumericInputChange}/>
                  <InputGroup.Append>
                    <Button variant="outline-success" className="addButton"><strong>+</strong></Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Row>
            </Form.Group>
            <Form.Group className="text-center">
              <Button type="submit" variant="dark" disabled={this.state.disableSubmit}>Search</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

AdvancedSearchForm.propTypes = {
  onResult: PropTypes.func.isRequired,
};

export default AdvancedSearchForm;

