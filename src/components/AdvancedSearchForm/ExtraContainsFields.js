import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const ExtraContainsField = (props, removeHandler) => {
  return (
    <InputGroup>
      <Form.Control {...props}/>
      <InputGroup.Append>
        <Button variant="outline-danger" className="removeButton" onClick={removeHandler}>
          <strong>-</strong>
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

const ExtraContainsAtField = (letterProps, indexProps, removeHandler) => {
  return (
    <Form.Row style={{ margin: 'auto' }}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ maxWidth: '7rem' }}>
            <small>Letter</small>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control {...letterProps} />
        <InputGroup.Prepend>
          <InputGroup.Text style={{ maxWidth: '7rem' }} className="border-left">
            <small>At Index</small>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control {...indexProps}/>
        <InputGroup.Append>
          <Button variant="outline-success" className="addButton"><strong>+</strong></Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Row>
  );
};

export default { ExtraContainsField };
