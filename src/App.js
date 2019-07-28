import React, { Component, Fragment } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SimpleForm from './components/SimpleForm/SimpleForm';
import AdvancedSearchForm from './components/AdvancedSearchForm/AdvancedSearchForm';
import ResultsView from './components/ResultsView/ResultsView';
import { DEFAULT_TIMEOUT } from './utils';
import * as localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { setup } from 'axios-cache-adapter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Advanced Search',
      results: null,
      error: null,
      request: null,
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.getComponentfromPage = this.getComponentfromPage.bind(this);
    this.setError = this.setError.bind(this);
    this.displayError = this.displayError.bind(this);
    this.setResults = this.setResults.bind(this);
    this.displayResults = this.displayResults.bind(this);

    this.baseProps = {
      onResult: this.setResults,
      onError: this.setError,
    };

    this.anagramsProps = {
      formTitle: 'Anagrams',
      formDescription: 'Enter a word to find its anagrams.',
      formRoute: 'get_anagrams',
      ...this.baseProps,
    };

    this.wordsWithinWordProps = {
      formTitle: 'Words Within Word',
      formDescription: 'Enter a word to find the words within it.',
      formRoute: 'get_words_within',
      ...this.baseProps,
    };

    this.wordsWithLettersProps = {
      formTitle: 'Words With Letters',
      formDescription: 'Enter letters to find the words you can make with them.',
      formRoute: 'get_words_from_letters',
      ...this.baseProps,
    };
  }

  async componentDidMount() {
    await localforage.defineDriver(memoryDriver);
    const storage = localforage.createInstance({
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver,
      ],
      name: 'wordplay-cache',
    });

    const request = setup({
      timeout: DEFAULT_TIMEOUT,
      cache: {
        exclude: { query: false },
        maxAge: 15 * 60 * 1000,
        readOnError: (err, req) => {
          return (
            err.message === 'Network Error' ||
            err.code === 'ECONNABORTED' ||
            err.response.status === 500);
        },
        clearOnStale: true, // for now, until the word list we use is finalized
        store: storage,
      },
    });

    this.setState({ request });
  }

  setCurrentPage(page) {
    this.setState({
      results: null,
      error: null,
      currentPage: page,
    });
  }

  getComponentfromPage(page) {
    switch (page) {
    case 'Advanced Search': return (<AdvancedSearchForm {...this.baseProps} request={this.state.request} />);
    case 'Anagrams': return (<SimpleForm {...this.anagramsProps} request={this.state.request}/>);
    case 'Words Within Word': return (<SimpleForm {...this.wordsWithinWordProps} request={this.state.request}/>);
    case 'Words With Letters': return (<SimpleForm {...this.wordsWithLettersProps} request={this.state.request}/>);
    default: return null;
    }
  }

  setError(err) {
    this.setState({ results: null, error: JSON.stringify(err) });
  }

  displayError(err) {
    return (<p>{err}</p>);
  }

  setResults(data) {
    data.sort();
    this.setState({ error: null, results: data });
  }

  displayResults(data) {
    if (data.length === 0) {
      return (<p>No results</p>);
    }
    // Ensure ResultView completely refreshes
    const key = `${data[0]}${data.length}${data[data.length - 1]}`;
    return (
      <ResultsView key={key} words={data} pageLimit={100}/>
    );
  }

  render() {
    return (
      <Fragment>
        <NavBar navHandler={this.setCurrentPage}/>
        <div className="App-header">
          {this.getComponentfromPage(this.state.currentPage)}
          <hr/>
          {this.state.error && this.displayError(this.state.error)}
          {this.state.results && this.displayResults(this.state.results)}
        </div>
      </Fragment>
    );
  }
}

export default App;
