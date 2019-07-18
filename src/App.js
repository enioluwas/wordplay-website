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
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  getComponentfromPage(page) {
    switch (page) {
    case 'Advanced Search': return (<AdvancedSearchForm/>);
    case 'Anagrams': return (<AnagramsForm/>);
    case 'Words Within Word': return (<WordsWithinForm/>);
    case 'Words With Letters': return (<WordsLettersForm/>);
    default: return null;
    }
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
