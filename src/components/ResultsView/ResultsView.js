import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';

class ResultsView extends Component {
  render() {
    return (
      <Card className="resultsCard border-0">
        <Card.Header>
          <span>Results</span>
          {/* <span className="float-right">Test</span> */}
        </Card.Header>
        <div className=" resultsContainer d-flex flex-wrap">
          {this.props.words.map((value, idx) => (<ResultItem key={idx} itemKey={idx} word={value}/>))}
        </div>
      </Card>
    );
  }
}

ResultsView.propTypes = {
  words: PropTypes.array.isRequired,
};

export default ResultsView;
