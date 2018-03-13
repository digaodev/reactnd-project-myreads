import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';

import sortBy from 'sort-by';

import * as BooksAPI from '../../BooksAPI';

import Book from '../Book/Book';

class Search extends Component {
  state = {
    searchQuery: '',
    booksFound: []
  };

  componentWillUnmount() {
    this.updateQuery('');
  }

  updateQuery = query => {
    this.setState({ searchQuery: query });

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
        .catch(err => console.log('err', err));
    } else {
      this.setState({ booksFound: [] });
    }
  };

  render() {
    const { onChangeShelf } = this.props;
    const { searchQuery, booksFound } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                // value={searchQuery}
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
