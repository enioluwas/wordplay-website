import React, { Component } from 'react';
import { ButtonGroup, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';
import ReactPaginate from 'react-paginate';

class ResultsView extends Component {
  constructor(props) {
    super(props);

    const { words, pageLimit } = this.props;

    this.state = {
      sorted: 'alpha',
      words,
      wordCount: words.length,
      currentWords: [],
      currentPage: 1,
      pageCount: Math.ceil(words.length / pageLimit),
    };

    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getCurrentWords = this.getCurrentWords.bind(this);
    this.displayCurrentWords = this.displayCurrentWords.bind(this);
  }

  componentDidMount() {
    this.getCurrentWords(this.state.currentPage);
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

    this.setState({ sorted: name, words }, this.getCurrentWords);
  }

  handlePageClick(event) {
    const { selected } = event;
    this.setState({
      currentPage: selected + 1,
    }, this.getCurrentWords);
  }

  getCurrentWords() {
    const startIndex = (this.state.currentPage - 1) * this.props.pageLimit;
    const endIndex = Math.min(this.state.wordCount, startIndex + this.props.pageLimit);
    const currentWords = this.state.words.slice(startIndex, endIndex);
    this.setState({ currentWords });
  }

  displayCurrentWords() {
    const currentWords = this.state.currentWords;
    return currentWords.map((value, idx) => (<ResultItem key={idx} itemKey={idx} word={value}/>));
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
          {this.displayCurrentWords()}
        </div>
        <Card.Footer className="paginatorContainer">
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={this.state.pageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            previousClassName="page-link"
            nextClassName="page-link"
            pageClassName="page-item"
            activeClassName="active"
            pageLinkClassName="page-link"
          />
        </Card.Footer>
      </Card>

    );
  }
}

ResultsView.propTypes = {
  words: PropTypes.array.isRequired,
  pageLimit: PropTypes.number.isRequired,
};

export default ResultsView;
