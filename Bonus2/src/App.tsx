import { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import { searchBooks, getBookDetails } from './services/bookService';
import { Book } from './types/book';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchBooks(query);
      setBooks(response.items || []);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = async (bookId: string) => {
    setLoading(true);
    try {
      const book = await getBookDetails(bookId);
      setSelectedBook(book);
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Search</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main className="app-main">
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : selectedBook ? (
          <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
        ) : (
          <BookList books={books} onBookSelect={handleBookSelect} />
        )}
      </main>
      <footer className="app-footer">
        <p>Powered by Google Books API</p>
      </footer>
    </div>
  );
}

export default App; 