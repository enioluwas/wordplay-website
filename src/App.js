import React, { Component, Fragment } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import AdvancedSearchForm from './components/AdvancedSearchForm/AdvancedSearchForm';
import AnagramsForm from './components/AnagramsForm/AnagramsForm';
import WordsWithinForm from './components/WordsWithinForm/WordsWithinForm';
import WordsLettersForm from './components/WordsLettersForm/WordsLettersForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Advanced Search',
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.getComponentfromPage = this.getComponentfromPage.bind(this);
    this.displayResults = this.displayResults.bind(this);
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  getComponentfromPage(page) {
    switch (page) {
    case 'Advanced Search': return (<AdvancedSearchForm onResult={this.displayResults}/>);
    case 'Anagrams': return (<AnagramsForm onResult={this.displayResults}/>);
    case 'Words Within Word': return (<WordsWithinForm onResult={this.displayResults}/>);
    case 'Words With Letters': return (<WordsLettersForm onResult={this.displayResults}/>);
    default: return null;
    }
  }

  displayResults(data) {

  }

  render() {
    return (
      <Fragment>
        <NavBar navHandler={this.setCurrentPage.bind(this)}/>
        <div className="App-header">
          {this.getComponentfromPage(this.state.currentPage)}
        </div>
      </Fragment>
    );
  }
}

export default App;
