import React from 'react';
import { Book } from '../types/book';

interface BookListProps {
  books: Book[];
  onBookSelect: (bookId: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onBookSelect }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div
          key={book.id}
          className="book-card"
          onClick={() => onBookSelect(book.id)}
        >
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200'}
            alt={book.volumeInfo.title}
            className="book-cover"
          />
          <div className="book-info">
            <h3 className="book-title">{book.volumeInfo.title}</h3>
            {book.volumeInfo.authors && (
              <p className="book-author">By {book.volumeInfo.authors.join(', ')}</p>
            )}
            {book.volumeInfo.publishedDate && (
              <p className="book-year">Published: {book.volumeInfo.publishedDate}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList; 