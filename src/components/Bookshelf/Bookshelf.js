import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Book from '../Book/Book';

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { title, shelf, books, onChangeShelf } = this.props;

    const filteredBooks = books.filter(book => book.shelf === shelf);

    return (
      <section className="bookshelf" tabIndex="0" aria-label={title}>
        <h2 className="bookshelf-title" >
          {title}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map(book => (
              <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
            ))}
          </ol>
        </div>
      </section>
    );
  }
}

export default Bookshelf;
