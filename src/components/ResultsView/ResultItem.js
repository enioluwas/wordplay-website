import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultItem extends Component {
  render() {
    return (
      <span id={`resultItem${this.props.itemKey}`} className="resultItem">
        {this.props.word}
      </span>
    );
  }
}

ResultItem.propTypes = {
  itemKey: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
};

export default ResultItem;
