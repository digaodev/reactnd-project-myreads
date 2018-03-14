import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

import * as BooksAPI from '../../BooksAPI';

import Book from '../Book/Book';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  state = {
    searchQuery: '',
    booksFound: []
  };

  componentWillUnmount() {
    this.updateQuery('');
  }

  updateQuery = query => {
    if (query) {
      BooksAPI.search(query)
        .then(queryBooks => {
          if (queryBooks.length > 0) {
            const myBooks = this.props.books;

            const mergedBooks = queryBooks.map(queryBook => {
              const myBook = myBooks.find(myBook => myBook.id === queryBook.id);
              return { ...queryBook, ...myBook };
            });
            this.setState({ booksFound: mergedBooks.sort(sortBy('title')) });
          } else {
            this.setState({ booksFound: [] });
          }
        })
        .catch(err => console.error(err));
    } else {
      this.setState({ booksFound: [] });
    }
  };

  render() {
    const { onChangeShelf } = this.props;
    const { booksFound } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={event => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksFound.map(book => {
              return (
                <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
