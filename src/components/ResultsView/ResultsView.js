import React, { Component } from 'react';
import { Button, ButtonGroup, Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';
import ReactPaginate from 'react-paginate';
import { isMobileOnly } from 'react-device-detect';
import ascendingIcon from '../../img/ascending-icon.png';
import descendingIcon from '../../img/descending-icon.png';
import aToZIcon from '../../img/a-to-z.png';
import zToAIcon from '../../img/z-to-a.png';

class ResultsView extends Component {
  constructor(props) {
    super(props);

    const { words, pageLimit } = this.props;

    this.state = {
      sorted: 'alpha',
      sizeSortOrder: 'ascending',
      alphaSortOrder: 'aToZ',
      currentSortOrder: 'aToZ',
      words,
      wordCount: words.length,
      currentWords: [],
      currentPage: 1,
      pageCount: Math.ceil(words.length / pageLimit),
    };

    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSortOrder = this.handleChangeSortOrder.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getCurrentWords = this.getCurrentWords.bind(this);
    this.getCurrentIcon = this.getCurrentIcon.bind(this);
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

    let sortOrder = null;
    const words = [].concat(this.state.words);
    if (name === 'alpha') {
      words.sort();
      sortOrder = this.state.alphaSortOrder;
      if (sortOrder === 'zToA') {
        words.reverse();
      }
    } else if (name === 'size') {
      words.sort((a, b) => a.length - b.length || a.localeCompare(b));
      sortOrder = this.state.sizeSortOrder;
      if (sortOrder === 'descending') {
        words.reverse();
      }
    }

    this.setState({
      sorted: name,
      words,
      currentSortOrder: sortOrder,
    }, this.getCurrentWords);
  }

  handleChangeSortOrder(event) {
    event.preventDefault();
    const { name } = event.target;
    const { alphaSortOrder } = this.state;
    const isAlpha = name === alphaSortOrder;
    const orders = isAlpha ? ['aToZ', 'zToA'] : ['ascending', 'descending'];
    const fieldToChange = isAlpha ? 'alphaSortOrder' : 'sizeSortOrder';
    const newSortOrder = name === orders[0] ? orders[1] : orders[0];
    const words = [].concat(this.state.words);
    words.reverse();

    this.setState({
      words,
      [fieldToChange]: newSortOrder,
      currentSortOrder: newSortOrder,
    }, this.getCurrentWords);
  }

  getCurrentIcon() {
    if (this.state.sorted === 'alpha') {
      if (this.state.alphaSortOrder === 'aToZ') {
        return aToZIcon;
      } else if (this.state.alphaSortOrder === 'zToA') {
        return zToAIcon;
      }
    } else if (this.state.sorted === 'size') {
      if (this.state.sizeSortOrder === 'ascending') {
        return ascendingIcon;
      } else if (this.state.sizeSortOrder === 'descending') {
        return descendingIcon;
      }
    }

    return null;
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
            <Image
              name={this.state.currentSortOrder}
              width="30"
              height="30"
              className="sortOrderImg mr-2"
              onClick={this.handleChangeSortOrder}
              src={this.getCurrentIcon()}/>
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
            marginPagesDisplayed={isMobileOnly? 1 : 2}
            pageRangeDisplayed={isMobileOnly ? 1 : 5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
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
