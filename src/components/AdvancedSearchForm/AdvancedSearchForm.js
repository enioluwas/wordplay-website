import React, { Component } from 'react';
import { Alert, Button, Card, Col, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isAlpha, isNumeric, API_KEY } from '../../utils';
import axios from 'axios';
import to from 'await-to-js';

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
      invalidFields: {},
      feedback: null,
    };

    this.updateVariableField = this.updateVariableField.bind(this);
    this.addExtraContainsFields = this.addExtraContainsFields.bind(this);
    this.handleAddContainsField = this.handleAddContainsField.bind(this);
    this.handleRemoveContainsField = this.handleRemoveContainsField.bind(this);
    this.handleContainsChange = this.handleContainsChange.bind(this);
    this.addExtraContainsAtFields = this.addExtraContainsAtFields.bind(this);
    this.handleAddContainsAtField = this.handleAddContainsAtField.bind(this);
    this.handleRemoveContainsAtField = this.handleRemoveContainsAtField.bind(this);
    this.handleContainsAtLetterChange = this.handleContainsAtLetterChange.bind(this);
    this.handleContainsAtIndexChange = this.handleContainsAtIndexChange.bind(this);
    this.handleAlphaInputChange = this.handleAlphaInputChange.bind(this);
    this.numericInputIsValid = this.numericInputIsValid.bind(this);
    this.handleNumericInputChange = this.handleNumericInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.displayFeedback = this.displayFeedback.bind(this);
  }

  addExtraContainsFields() {
    return this.state.contains.map((value, idx) => {
      if (idx === 0) {
        return null;
      }
      return (
        <InputGroup key={`contains${idx}`}>
          <Form.Control
            name={`contains${idx}`}
            className={this.state.invalidFields[`contains${idx}`] && 'is-invalid'}
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
    });
  }

  addExtraContainsAtFields() {
    return this.state.containsAtLetter.map((value, idx) => {
      if (idx === 0) {
        return null;
      }
      return (
        <Form.Row key={`containsAt${idx}`} style={{ margin: 'auto' }}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text style={{ maxWidth: '7rem' }}>
                <small>Letter</small>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name={`containsAtLetter${idx}`}
              className={`lbShort ${this.state.invalidFields[`containsAtLetter${idx}`] ?
                'is-invalid' : ''}`}
              type="text"
              placeholder="a-z"
              maxLength="1"
              value={this.state.containsAtLetter[idx]}
              onChange={this.handleContainsAtLetterChange}/>
            <InputGroup.Prepend>
              <InputGroup.Text style={{ maxWidth: '7rem' }} className="border-left">
                <small>At Index</small>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name={`containsAtIndex${idx}`}
              className={`lbShort ${this.state.invalidFields[`containsAtIndex${idx}`] ?
                'is-invalid' : ''}`}
              type="text"
              placeholder="1-15"
              maxLength="2"
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
    });
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
    field[index] = value.substring(0, maxLength).toLowerCase();
    this.setState({
      [fieldToUpdate]: field,
      invalidFields: {},
    });
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
      this.setState({ [name]: value.substring(0, maxLength).toLowerCase(),
        invalidFields: {},
      });
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
      this.setState({ [name]: value.substring(0, maxLength),
        invalidFields: {},
      });
    }
  }

  handleAddContainsField() {
    const updated = this.state.contains.concat('');
    this.setState({ contains: updated, invalidFields: {} });
    this.setState((prevState) => ({ containsCount: prevState.containsCount + 1 }));
  }

  handleRemoveContainsField(index) {
    const contains = [...this.state.contains];
    contains.splice(index, 1);
    this.setState( { contains, invalidFields: {} });
    this.setState((prevState) => ({ containsCount: prevState.containsCount - 1 }));
  }

  handleAddContainsAtField() {
    const updatedLetters = this.state.containsAtLetter.concat('');
    const updatedIndexes = this.state.containsAtIndex.concat('');
    this.setState({
      containsAtLetter: updatedLetters,
      containsAtIndex: updatedIndexes,
      invalidFields: {},
    });
    this.setState((prevState) => ({ containsAtCount: prevState.containsAtCount + 1 }));
  }

  handleRemoveContainsAtField(index) {
    const containsAtLetter = [...this.state.containsAtLetter];
    containsAtLetter.splice(index, 1);
    const containsAtIndex = [...this.state.containsAtIndex];
    containsAtIndex.splice(index, 1);
    this.setState({
      containsAtLetter,
      containsAtIndex,
      invalidFields: {},
    });
    this.setState((prevState) => ({ containsAtCount: prevState.containsAtCount - 1 }));
  }

  validateInput() {
    let invalidFields = {};
    let isValid = true;
    let containsAtEmptyCount = 0;
    let feedback = null;
    for (let idx = 0; idx < this.state.containsAtCount; idx++) {
      const atLetter = this.state.containsAtLetter[idx];
      const atIndex = this.state.containsAtIndex[idx];
      if (atLetter !== atIndex) {
        if (!atLetter) {
          invalidFields[`containsAtLetter${idx === 0 ? '' : idx}`] = true;
          isValid = false;
          feedback = 'Fill in both "Letter" and "At Index" fields';
        } else if (!atIndex) {
          invalidFields[`containsAtIndex${idx === 0 ? '' : idx}`] = true;
          isValid = false;
          feedback = 'Fill in both "Letter" and "atIndex" fields.';
        }
      } else if (atLetter === '' && atIndex === '') {
        containsAtEmptyCount++;
      }
    }

    const containsAtIsEmpty = containsAtEmptyCount === this.state.containsAtCount;
    // Only check this if no invalid fields yet
    if (isValid && containsAtIsEmpty) {
      // Check if all other fields are empty
      isValid = !!(this.state.beginsWith || this.state.endsWith || this.state.size);

      // If they're all empty then we check all of these
      if (!isValid) {
        for (let idx = 0; idx < this.state.containsCount; idx++) {
          if (this.state.contains[idx]) {
            isValid = true;
            break;
          }

          invalidFields[`contains${idx === 0 ? '' : idx}`] = true;
        }

        // If they're confirmed all empty, then we add em all to invalidFields
        invalidFields.beginsWith = true;
        invalidFields.endsWith = true;
        invalidFields.size = true;
        for (let idx = 0; idx < this.state.containsAtCount; idx++) {
          invalidFields[`containsAtLetter${idx === 0 ? '' : idx}`] = true;
          invalidFields[`containsAtIndex${idx === 0 ? '' : idx}`] = true;
        }
        feedback = 'Fill in at least one of the fields.';
      }
    }

    // We may have added some in the contains check so we wipe
    if (isValid) {
      invalidFields = {};
      feedback = null;
    }
    this.setState({ invalidFields, feedback });
    return isValid;
  }

  displayFeedback() {
    if (!this.state.feedback) {
      return null;
    } else {
      return (
        <Alert variant="danger" onClose={() => {
          this.setState({ feedback: null, invalidFields: {} });
        }} dismissible>
          {this.state.feedback}
        </Alert>
      );
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.validateInput()) {
      return;
    }

    this.setState({ disableSubmit: true });
    let url = `https://www.wordplay-api.stream/get_words?api_key=${API_KEY}`;

    if (this.state.beginsWith) {
      url += `&begins_with=${this.state.beginsWith}`;
    }
    if (this.state.endsWith) {
      url += `&ends_with=${this.state.endsWith}`;
    }
    const contains = this.state.contains.filter((item) => item.length > 0);
    if (contains.length > 0) {
      url += `&contains=${contains.join(',')}`;
    }

    const containsAt = [];
    for (const [idx, item] of this.state.containsAtLetter.entries()) {
      if (item.length === 0) {
        continue;
      }
      containsAt.push(`${item}${this.state.containsAtIndex[idx]}`);
    }
    if (containsAt.length > 0) {
      url += `&contains_at=${containsAt.join(',')}`;
    }

    if (this.state.size) {
      url += `&size_is=${this.state.size}`;
    }

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
        <Card.Header className="text-center">
        Advanced Search
        </Card.Header>
        <Card.Body style={{ padding: '.8rem' }}>
          {this.state.feedback && this.displayFeedback()}
          <Form border="dark">
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Begins With</Form.Label>
                <Form.Control
                  name="beginsWith"
                  className={this.state.invalidFields['beginsWith'] && 'is-invalid'}
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
                  className={this.state.invalidFields['endsWith'] && 'is-invalid'}
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
                  className={this.state.invalidFields['size'] && 'is-invalid'}
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
                  className={this.state.invalidFields['contains'] && 'is-invalid'}
                  type="text"
                  placeholder="e.g ere"
                  maxLength="15"
                  value={this.state.contains[0]}
                  onChange={this.handleContainsChange}/>
                <InputGroup.Append>
                  <Button
                    variant="outline-success"
                    className="addButton"
                    disabled={this.state.containsCount >= 15}
                    onClick={this.handleAddContainsField}>+</Button>
                </InputGroup.Append>
              </InputGroup>
              {this.state.containsCount > 1 && this.addExtraContainsFields()}
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
                    className={`lbShort ${this.state.invalidFields[`containsAtLetter`] ?
                      'is-invalid' : ''}`}
                    type="text"
                    placeholder="a-z"
                    maxLength="1"
                    value={this.state.containsAtLetter[0]}
                    onChange={this.handleContainsAtLetterChange}/>
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ maxWidth: '7rem' }} className="border-left">
                      <small>At Index</small>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="containsAtIndex"
                    className={`lbShort ${this.state.invalidFields[`containsAtIndex`] ?
                      'is-invalid' : ''}`}
                    type="text"
                    placeholder="1-15"
                    maxLength="2"
                    value={this.state.containsAtIndex[0]}
                    onChange={this.handleContainsAtIndexChange}/>
                  <InputGroup.Append>
                    <Button
                      variant="outline-success"
                      className="addButton"
                      disabled={this.state.containsAtCount >= 15}
                      onClick={this.handleAddContainsAtField}>+</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Row>
              {this.state.containsAtCount > 1 && this.addExtraContainsAtFields()}
            </Form.Group>
            <Form.Group className="text-center">
              <Button type="submit"
                variant="dark"
                disabled={this.state.disableSubmit}
                onClick={this.handleSubmit}>Search</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

AdvancedSearchForm.propTypes = {
  onResult: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default AdvancedSearchForm;

