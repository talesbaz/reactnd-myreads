import React from 'react';
import Book from '../Book';
import PropTypes from 'prop-types';

const Shelf = ({ title, books, onChangeShelf, handleCurrentStatus }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(bookItem => <li key={bookItem.id}> <Book book={bookItem} onChangeShelf={onChangeShelf} handleCurrentStatus={handleCurrentStatus} /> </li>)}
      </ol>
    </div>
  </div>
);

Shelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  handleCurrentStatus: PropTypes.func.isRequired
};

export default Shelf;
