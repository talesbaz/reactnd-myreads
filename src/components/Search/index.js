import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../../BooksAPI';
import Book from '../Book';

class Search extends Component {

  constructor(props) {

    super(props);

    const debounce = this.debounce;

    this.state = {
      searchedBooks: [],
      query: '',
      isLoading: false,
      noResults: false
    };

    this.updateQuery = debounce(() => {
      this.findBook(this.state.query);
    }, 280);
  }

  /**
   * Delay api calls to avoid api flood
   *
   * @param {*} func
   * @param {*} wait
   * @param {*} immediate
   * @returns boid
   * @memberof Search
   */
  debounce = (func, wait, immediate) => {

    let timeout;
    return function () {

      const context = this;
      const args = arguments;

      const later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  /**
   * Find a specific throught a query
   *
   * @param string query - query typed by user, must match with author or book title (api v1)
   * @returns void
   * @memberof Search
   */
  findBook = query => {

    if (query.trim().length === 0) {
      this.setState({ searchedBooks: [] });
      return;
    }

    this.setState({ isLoading: true });

    search(query).then(findedBooks => {

      this.setState({ isLoading: false, noResults: false });

      if (findedBooks.error === 'empty query') {

        this.setState({ noResults: true });
        return;
      }

      this.setState({ searchedBooks: findedBooks, noResults: false });
    });
  }

  render() {

    const { query, searchedBooks, isLoading, noResults } = this.state;
    const { onChangeShelf, handleCurrentStatus } = this.props;

    return (
      <div className="search-books">

        <div className="search-books-bar">

          <Link to='/' className="close-search" />

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => {
                this.setState({ query: event.target.value });
                this.setState({ searchedBooks: [] });
                this.updateQuery();
              }}
            />
          </div>

        </div>

        <div className="search-books-results">

          {query.trim().length === 0 && (
            <h2>Use the text box above to search...</h2>
          )}

          {isLoading && (
            <div className="loader">Loading...</div>
          )}

          {(!isLoading && noResults && query.trim().length !== 0) && (
            <h3 className="error">No results were found for <i>{query}</i>.</h3>
          )}

          <ol className="books-grid">
            {(!isLoading && searchedBooks.length > 0) && searchedBooks.map(bookItem => (
              <li key={bookItem.id}>
                <Book book={bookItem} onChangeShelf={onChangeShelf} handleCurrentStatus={handleCurrentStatus} />
              </li>
            ))}
          </ol>

        </div>

      </div>
    );
  }
}

Search.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  handleCurrentStatus: PropTypes.func.isRequired
};

export default Search;
