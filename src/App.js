import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as api from './BooksAPI';
import './App.scss';

import Search from './components/Search';
import List from './components/List';

class BooksApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {

    // Fetch All books to store
    api.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (<List books={this.state.books} />)} />
        <Route exact path="/search" render={() => (<Search books={this.state.books} />)} />
      </div>
    );
  }
}

export default BooksApp;
