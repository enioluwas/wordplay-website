import React, { Component, Fragment } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import AdvancedSearchForm from './components/AdvancedSearchForm/AdvancedSearchForm';
import AnagramsForm from './components/AnagramsForm/AnagramsForm';
import WordsWithinForm from './components/WordsWithinForm/WordsWithinForm';
import WordsLettersForm from './components/WordsLettersForm/WordsLettersForm';
import ResultsView from './components/ResultsView/ResultsView';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Advanced Search',
      results: [],
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.getComponentfromPage = this.getComponentfromPage.bind(this);
    this.setResults = this.setResults.bind(this);
    this.displayResults = this.displayResults.bind(this);
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  getComponentfromPage(page) {
    switch (page) {
    case 'Advanced Search': return (<AdvancedSearchForm onResult={this.setResults}/>);
    case 'Anagrams': return (<AnagramsForm onResult={this.setResults}/>);
    case 'Words Within Word': return (<WordsWithinForm onResult={this.setResults}/>);
    case 'Words With Letters': return (<WordsLettersForm onResult={this.setResults}/>);
    default: return null;
    }
  }

  setResults(data) {
    this.setState({ results: data });
  }

  displayResults(data) {
    return (
      <ResultsView words={data}/>
    );
  }

  render() {
    return (
      <Fragment>
        <NavBar navHandler={this.setCurrentPage.bind(this)}/>
        <div className="App-header">
          {this.getComponentfromPage(this.state.currentPage)}
          <hr></hr>
          {this.state.results.length > 0 && this.displayResults(this.state.results)}
        </div>
      </Fragment>
    );
  }
}

export default App;
