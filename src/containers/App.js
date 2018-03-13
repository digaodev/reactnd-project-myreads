import React from 'react';
import { Route, Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';

import './App.css';

import ListBooks from '../components/ListBooks/ListBooks';
import Search from '../components/Search/Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
    books: []
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      const updatedBook = { ...book, shelf };
      const bookIndex = this.state.books.indexOf(book);

      let booksArrayCopy = [...this.state.books];
      booksArrayCopy.splice(bookIndex, 1, updatedBook);

      this.setState({ books: booksArrayCopy });
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search books={this.state.books} onChangeShelf={this.changeShelf} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <ListBooks
                books={this.state.books}
                onChangeShelf={this.changeShelf}
              />

              <div className="open-search">
                <Link to="/search">Search and add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
