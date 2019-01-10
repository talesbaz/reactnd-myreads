import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as api from './BooksAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
  onChangeShelf = (event, book) => {

    event.persist();

    api
      .update(book, event.target.value)
      .then(data => {

        const toasterOptions = {
          'position': 'bottom-right',
          'autoClose': 2000,
          'hideProgressBar': true,
          'closeOnClick': true,
          'pauseOnHover': true,
          'draggable': false
        };

        try {

          if (!data) {
            throw new Error('Error on update book status.');
          }

          if (!book.shelf) {

            book.shelf = event.target.value;
            const newBooks = [...this.state.books, book];
            this.setState({ books: newBooks });

          } else {

            const newBooks = this.state.books
              .map(item => {
                if (item.id === book.id) item.shelf = event.target.value;

                return item;
              });
            this.setState({ books: newBooks });
          }

          toast.success('Book status updated with success.', toasterOptions);

        } catch (error) {

          toast.error(error, toasterOptions);
        }

      });
  }

  /**
   *  Handle the book status
   *
   * @param {*} book - book instance
   * @returns void
   * @memberof BooksApp
   */
  handleCurrentStatus = book => {

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

        {/* Toster notifyer */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          pauseOnHover
        />
      </div>
    );
  }
}

export default BooksApp;
