import React, { Component } from 'react';

import Book from '../Book/Book';

class Bookshelf extends Component {
  render() {
    const { title, shelf, books, onChangeShelf } = this.props;

    const filteredBooks = books.filter(book => book.shelf === shelf);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map(book => (
              <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
