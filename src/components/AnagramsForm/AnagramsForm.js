import React, { Component } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';

export default class AnagramsForm extends Component {
  submit(event) {
    const form = event.currentTarget;
    form.checkValidity();
    event.preventDefault();
  }

  getResults() {

  }

  render() {
    return (
      <Card border="dark" className="formCard text-center">
        <Card.Header>Anagrams</Card.Header>
        <Card.Body>
          <Card.Text>Enter a word to find its anagrams.</Card.Text>
          <Form border="dark" onSubmit={this.submit.bind(this)}>
            <Form.Row style={{ margin: 'auto' }}>
              <Form.Group as={Col} md="9" controlId="anagramsWord">
                <Form.Control controlId type="text" placeholder="Word" />
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Button type="submit" variant="dark">Search</Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
