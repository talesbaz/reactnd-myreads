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
    api
      .getAll()
      .then(books => {
        this.setState({ books });
      });
  }

  /**
   * Handle the book change on the shelves
   *
   * @param {*} event - component event where the trigger occurred
   * @param {*} book - book instance
   * @returns void
   * @memberof BooksApp
   */
  onChangeShelf (event, book) {

    event.persist();

    api
      .update(book, event.target.value)
      .then(data => {

        if (!data) {
          console.log('Erro ao atualizar o livro');
        }

        let newsBooks;
        if (!book.shelf) {

          newsBooks = this.state.books;
          book.shelf = event.target.value;
          newsBooks.push(book);
        } else {

          newsBooks = this
            .state
            .books
            .map(item => {
              if (item.id === book.id) item.shelf = event.target.value;

              return item;
            });
        }

        this.setState({ books: newsBooks });
      });
  }

  /**
   *  Manipulate the book status
   *
   * @param {*} book - book instance
   * @returns void
   * @memberof BooksApp
   */
  handleCurrentStatus (book) {

    const currentBooks = this
      .state
      .books
      .filter(bookItem => {

        if (bookItem.id === book.id) {
          return bookItem;
        }
        return false;
      });

    return currentBooks.length > 0 ? currentBooks[0].shelf : 'none';
  }

  render() {

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <List
              books={this.state.books}
              onChangeShelf={(event, book) => this.onChangeShelf(event, book)}
              handleCurrentStatus={book => this.handleCurrentStatus(book)}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              onChangeShelf={(event, book) => this.onChangeShelf(event, book)}
              handleCurrentStatus={book => this.handleCurrentStatus(book)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
