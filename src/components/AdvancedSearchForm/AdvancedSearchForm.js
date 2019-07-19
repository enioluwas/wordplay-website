import React, { Component } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';

export default class AdvancedSearchForm extends Component {
  render() {
    // const optionsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    // const OptionsList = ({ list }) => (
    //   <FormControl as="select">
    //     <option>{`${list[0]}-${list[list.length - 1]}`}</option>
    //     {list.map((item) => (<option key={item}>{item}</option>))}
    //   </FormControl>
    // );

    return (
      <Card border="dark" className="formCard">
        <Card.Header className="text-center">
        Advanced Search
        </Card.Header>
        <Card.Body>
          <Card.Text>Fill in the criteria below to find words.</Card.Text>
          <Form border="dark">
            <Form.Group>
              <Form.Label>Begins With</Form.Label>
              <Form.Control type="text" placeholder="e.g anglo"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ends With</Form.Label>
              <Form.Control type="text" placeholder="e.g tion"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contains</Form.Label>
              <Form.Control type="text" placeholder="e.g ere"></Form.Control>
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
                  <Form.Control type="text" placeholder="A-Z" maxLength="1" className="lbShort"/>
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ maxWidth: '7rem' }} className="border-left">
                      <small>At Index</small>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="text" placeholder="1-15" maxLength="2" className="lbShort"/>
                </InputGroup>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control type="text" placeholder="1-15" maxLength="2"></Form.Control>
            </Form.Group>
            <Form.Group className="text-center">
              <Button type="submit" variant="dark">Search</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
