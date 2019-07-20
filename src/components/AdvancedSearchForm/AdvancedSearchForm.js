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
      contains: [''],
      containsCount: 1,
      containsAtLetter: [''],
      containsAtIndex: [''],
      containsAtCount: 1,
      size: '',
      disableSubmit: false,
    };

    this.updateVariableField = this.updateVariableField.bind(this);

    this.handleAddContainsField = this.handleAddContainsField.bind(this);
    this.handleRemoveContainsField = this.handleRemoveContainsField.bind(this);
    this.handleContainsChange = this.handleContainsChange.bind(this);

    this.handleAddContainsAtField = this.handleAddContainsAtField.bind(this);
    this.handleRemoveContainsAtField = this.handleRemoveContainsAtField.bind(this);
    this.handleContainsAtLetterChange = this.handleContainsAtLetterChange.bind(this);
    this.handleContainsAtIndexChange = this.handleContainsAtIndexChange.bind(this);

    this.handleAlphaInputChange = this.handleAlphaInputChange.bind(this);
    this.numericInputIsValid = this.numericInputIsValid.bind(this);
    this.handleNumericInputChange = this.handleNumericInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContainsChange(event) {
    const { name, value, maxLength } = event.target;
    if (value.length === 0 || isAlpha(value)) {
      this.updateVariableField(name, value, maxLength, 's', 'contains');
    }
  }

  updateVariableField(name, value, maxLength, endChar, fieldToUpdate) {
    const index = name.endsWith(endChar) ? 0 : parseInt(name.slice(-1));
    const field = [...this.state[fieldToUpdate]];
    field[index] = value.substring(0, maxLength);
    this.setState({ [fieldToUpdate]: field });
  }

  handleContainsAtLetterChange(event) {
    const { name, value, maxLength } = event.target;
    if (value.length === 0 || isAlpha(value)) {
      this.updateVariableField(name, value, maxLength, 'r', 'containsAtLetter');
    }
  }

  handleContainsAtIndexChange(event) {
    const { name, value, maxLength } = event.target;
    if (this.numericInputIsValid(value)) {
      this.updateVariableField(name, value, maxLength, 'x', 'containsAtIndex');
    }
  }

  handleAlphaInputChange(event) {
    const { name, value, maxLength } = event.target;
    if (value.length === 0 || isAlpha(value)) {
      this.setState({ [name]: value.substring(0, maxLength) });
    }
  }

  numericInputIsValid(value) {
    if (value.length === 0) {
      return true;
    }
    if (!isNumeric(value)) {
      return false;
    }
    if (value === '0') {
      return false;
    }
    if (parseInt(value) > 15) {
      return false;
    }
    return true;
  }

  handleNumericInputChange(event) {
    const { name, value, maxLength } = event.target;
    if (this.numericInputIsValid(value)) {
      this.setState({ [name]: value.substring(0, maxLength) });
    }
  }

  handleAddContainsField() {
    const updated = this.state.contains.concat('');
    this.setState({ contains: updated });
    this.setState((prevState) => ({ containsCount: prevState.containsCount + 1 }));
  }

  handleRemoveContainsField(index) {
    const contains = [...this.state.contains];
    contains.splice(index, 1);
    this.setState( { contains });
    this.setState((prevState) => ({ containsCount: prevState.containsCount - 1 }));
  }

  handleAddContainsAtField() {
    const updatedLetters = this.state.containsAtLetter.concat('');
    const updatedIndexes = this.state.containsAtIndex.concat('');
    this.setState({ containsAtLetter: updatedLetters, containsAtIndex: updatedIndexes });
    this.setState((prevState) => ({ containsAtCount: prevState.containsAtCount + 1 }));
  }

  handleRemoveContainsAtField(index) {
    const containsAtLetter = [...this.state.containsAtLetter];
    containsAtLetter.splice(index, 1);
    const containsAtIndex = [...this.state.containsAtIndex];
    containsAtIndex.splice(index, 1);
    this.setState({ containsAtLetter, containsAtIndex });
    this.setState((prevState) => ({ containsAtCount: prevState.containsAtCount - 1 }));
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
                  value={this.state.contains[0]}
                  onChange={this.handleContainsChange}/>
                <InputGroup.Append>
                  <Button
                    variant="outline-success"
                    className="addButton"
                    onClick={this.handleAddContainsField}>+</Button>
                </InputGroup.Append>
              </InputGroup>
              {this.state.containsCount > 1 &&
              this.state.contains.map((value, idx) => {
                if (idx === 0) {
                  return null;
                }
                return (
                  <InputGroup key={idx}>
                    <Form.Control
                      name={`contains${idx}`}
                      type="text"
                      placeholder="e.g ere"
                      maxLength="15"
                      value={this.state.contains[idx]}
                      onChange={this.handleContainsChange}/>
                    <InputGroup.Append>
                      <Button
                        variant="outline-danger"
                        className="removeButton"
                        onClick={() => this.handleRemoveContainsField(idx)}>-</Button>
                    </InputGroup.Append>
                  </InputGroup>
                );
              })}
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
                    value={this.state.containsAtLetter[0]}
                    onChange={this.handleContainsAtLetterChange}/>
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
                    value={this.state.containsAtIndex[0]}
                    onChange={this.handleContainsAtIndexChange}/>
                  <InputGroup.Append>
                    <Button
                      variant="outline-success"
                      className="addButton"
                      onClick={this.handleAddContainsAtField}>+</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Row>
              {this.state.containsAtCount > 1 &&
                this.state.containsAtLetter.map((value, idx) => {
                  if (idx === 0) {
                    return null;
                  }
                  return (
                    <Form.Row key={idx} style={{ margin: 'auto' }}>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text style={{ maxWidth: '7rem' }}>
                            <small>Letter</small>
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name={`containsAtLetter${idx}`}
                          type="text"
                          placeholder="A-Z"
                          maxLength="1"
                          className="lbShort"
                          value={this.state.containsAtLetter[idx]}
                          onChange={this.handleContainsAtLetterChange}/>
                        <InputGroup.Prepend>
                          <InputGroup.Text style={{ maxWidth: '7rem' }} className="border-left">
                            <small>At Index</small>
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name={`containsAtIndex${idx}`}
                          type="text"
                          placeholder="1-15"
                          maxLength="2"
                          className="lbShort"
                          value={this.state.containsAtIndex[idx]}
                          onChange={this.handleContainsAtIndexChange}/>
                        <InputGroup.Append>
                          <Button
                            variant="outline-danger"
                            className="removeButton"
                            onClick={() => this.handleRemoveContainsAtField(idx)}>-</Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form.Row>
                  );
                })}

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

