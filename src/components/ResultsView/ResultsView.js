import React, { Component } from 'react';
import { ButtonGroup, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';

class ResultsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sorted: 'alpha',
      words: props.words,
    };

    this.handleChangeSort = this.handleChangeSort.bind(this);
  }

  handleChangeSort(event) {
    event.preventDefault();
    const { name } = event.target;
    if (name === this.state.sorted) {
      return;
    }
    const words = [].concat(this.state.words);

    if (name === 'alpha') {
      words.sort();
    } else if (name === 'size') {
      words.sort((a, b) => a.length - b.length || a.localeCompare(b));
    }

    this.setState({ sorted: name, words });
  }

  render() {
    return (
      <Card className="resultsCard border-0">
        <Card.Header style={{ padding: '.8rem' }}>
          <span>Results</span>
          <span className="float-right">
            <ButtonGroup>
              <Button
                name="alpha"
                variant={this.state.sorted === 'alpha'? 'dark' : 'outline-dark'}
                size="sm"
                onClick={this.handleChangeSort}>
                  Alpha
              </Button>
              <Button
                name="size"
                variant={this.state.sorted === 'size'? 'dark' : 'outline-dark'}
                size="sm"
                onClick={this.handleChangeSort}>
                  Size
              </Button>
            </ButtonGroup>
          </span>
        </Card.Header>
        <div className=" resultsContainer d-flex flex-wrap">
          {this.state.words.map((value, idx) => (<ResultItem key={idx} itemKey={idx} word={value}/>))}
        </div>
      </Card>
    );
  }
}

ResultsView.propTypes = {
  words: PropTypes.array.isRequired,
};

export default ResultsView;
