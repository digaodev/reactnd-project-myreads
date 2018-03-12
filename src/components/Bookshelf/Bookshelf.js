import React, { Component } from 'react';

import Book from '../Book/Book';

class Bookshelf extends Component {
  render() {
    const filteredBooks = this.props.books.filter(
      book => book.shelf === this.props.shelf
    );

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map(book => <Book key={book.id} book={book} onChangeShelf={this.props.onChangeShelf}/>)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
