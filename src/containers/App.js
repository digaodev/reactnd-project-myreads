import React from 'react';
import { Route, Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';

import './App.css';

import ListBooks from '../components/ListBooks/ListBooks';
import Search from '../components/Search/Search';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <main className="app">
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
      </main>
    );
  }
}

export default BooksApp;
