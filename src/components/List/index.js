import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Shelf from '../Shelf';

const List = ({ books, onChangeShelf, handleCurrentStatus }) => {

  const bookStatus = [
    {
      'title': 'Currently Reading',
      'status': 'currentlyReading'
    }, {
      'title': 'Want to Read',
      'status': 'wantToRead'
    }, {
      'title': 'Read',
      'status': 'read'
    }
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {
          bookStatus.map(category => {
            const bookShelf = books.filter(book => book.shelf === category.status);
            return (
              <div key={category.status}><Shelf title={category.title} books={bookShelf} onChangeShelf={onChangeShelf} handleCurrentStatus={handleCurrentStatus} /></div>
            );
          })
        }
      </div>
      <div className="open-search">
        <Link to='/search' title="Add a book">Add a book</Link>
      </div>
    </div>
  );

};

List.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  handleCurrentStatus: PropTypes.func.isRequired
};

export default List;
