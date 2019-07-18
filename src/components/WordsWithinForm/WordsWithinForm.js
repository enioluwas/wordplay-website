import React, { Component } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';

export default class WordsWithinForm extends Component {
  render() {
    return (
      <Card style={{ width: '24rem' }} border="dark" className="text-center">
        <Card.Header>
          Words Within Word
        </Card.Header>
        <Card.Body>
          <Card.Text>Enter a word to find the words within it.</Card.Text>
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
