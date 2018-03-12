import React from 'react';

import * as BooksAPI from './BooksAPI';

import './App.css';

import ListBooks from './components/ListBooks/ListBooks';
import Search from './components/Search/Search';

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
    const updatedBook = { ...book, shelf };
    const bookIndex = this.state.books.findIndex(item => item.id === book.id);

    let booksArrayCopy = [...this.state.books];
    booksArrayCopy.splice(bookIndex, 1, updatedBook);

    BooksAPI.update(book, shelf).then(res => {
      // console.log(res);
      this.setState({ books: booksArrayCopy });
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <ListBooks
              books={this.state.books}
              onChangeShelf={(book, shelf) => {
                this.changeShelf(book, shelf);
              }}
            />

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
