import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import './Detail.scss';

class Detail extends Component {

  constructor(props) {

    super(props);

    this.state = {
      openModal: false
    };
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  }

  onCloseModal = () => {
    this.setState({ openModal: false });
  }

  render() {

    const { openModal } = this.state;
    const { book } = this.props;

    return (
      <div className="detail-wrapper">
        <button type="button" onClick={this.onOpenModal}>+ Detail</button>
        <Modal open={openModal} onClose={this.onCloseModal} center>
          <h1>Book Details</h1>
          {book.imageLinks && (<img className="cover-image" src={book.imageLinks.thumbnail} alt={book.title} />) }

          <h2>{book.title}</h2>
          <h3> {!!book.authors && book.authors.map(author => <div key={`${book.id}-${author}`} className="book-authors">{author}</div>)}</h3>

          {book.description && (<blockquote>{book.description}</blockquote>) }
          {!!book.categories && (<div className="details">Category: {book.categories.map(category => <div key={category}><strong>{category}</strong></div>)}</div>)}

          {book.publisher && (<div className="details">Publisher: <strong>{book.publisher}</strong></div>) }
          {book.publishedDate && (<div className="details">Publisher Date: <strong>{book.publishedDate}</strong></div>) }
          { (book.averageRating && book.ratingsCount) && (<div className="details">Rating: <strong>{book.averageRating} ({book.ratingsCount} votes)</strong></div>) }

          {book.previewLink && (<div className="details">Preview Link: <a href={book.previewLink} rel="opener" title="Preview">Click for preview</a></div>) }

          <h6>Click on the top right X to Close.</h6>
        </Modal>
      </div>
    );

  }
}

Detail.propTypes = {
  book: PropTypes.shape({}).isRequired,
};

export default Detail;
