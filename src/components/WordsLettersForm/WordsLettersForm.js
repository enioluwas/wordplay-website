import React, { Component } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';

export default class WordsLettersForm extends Component {
  render() {
    return (
      <Card border="dark" className="formCard text-center">
        <Card.Header>
          Words With Letters
        </Card.Header>
        <Card.Body>
          <Card.Text>Enter a bunch of letters to find the words you can make from them.</Card.Text>
          <Form border="dark">
            <Form.Row>
              <Col md="9">
                <Form.Control type="text" placeholder="Word" />
              </Col>
              <Col md="3">
                <Button type="submit" variant="dark">Search</Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
