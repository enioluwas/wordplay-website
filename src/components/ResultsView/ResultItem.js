import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultItem extends Component {
  render() {
    return (
      <div className="resultItem">
        {this.props.word}
      </div>
    );
  }
}

ResultItem.propTypes = {
  word: PropTypes.string.isRequired,
};

export default ResultItem;
