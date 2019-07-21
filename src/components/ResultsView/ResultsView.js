import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';

class ResultsView extends Component {
  render() {
    return (
      <Jumbotron fluid
        style={{
          width: '96%',
          padding: '.5em',
        }}>
        <Container style={{ padding: '.5em' }}>
          <div className="d-flex flex-wrap">
            {this.props.words.map((value, idx) => (<ResultItem key={idx} word={value}/>))}
          </div>
        </Container>
      </Jumbotron>
    );
  }
}

ResultsView.propTypes = {
  words: PropTypes.array.isRequired,
};

export default ResultsView;
