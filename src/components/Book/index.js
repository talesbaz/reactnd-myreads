import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book }) => {

  const thumb = book.imageLinks ? book.imageLinks.smallThumbnail : 'https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/cancel-2-128.png';

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumb}")` }} />
        </div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {!!book.authors && book
        .authors
        .map(author => <div key={`${book.id}-${author}`} className="book-authors">{author}</div>)}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({}).isRequired
};

export default Book;
