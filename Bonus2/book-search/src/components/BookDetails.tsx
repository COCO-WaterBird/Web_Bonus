import React from 'react';
import { Book } from '../types/book';

interface BookDetailsProps {
  book: Book;
  onClose: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onClose }) => {
  return (
    <div className="book-details">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <div className="details-content">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/300x400'}
          alt={book.volumeInfo.title}
          className="details-cover"
        />
        <div className="details-info">
          <h2 className="details-title">{book.volumeInfo.title}</h2>
          {book.volumeInfo.authors && (
            <p className="details-author">By {book.volumeInfo.authors.join(', ')}</p>
          )}
          {book.volumeInfo.publisher && (
            <p className="details-publisher">Publisher: {book.volumeInfo.publisher}</p>
          )}
          {book.volumeInfo.publishedDate && (
            <p className="details-year">Published: {book.volumeInfo.publishedDate}</p>
          )}
          {book.volumeInfo.categories && (
            <p className="details-categories">
              Categories: {book.volumeInfo.categories.join(', ')}
            </p>
          )}
          {book.volumeInfo.description && (
            <div className="details-description">
              <h3>Description</h3>
              <p>{book.volumeInfo.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 