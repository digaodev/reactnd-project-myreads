import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Bookshelf from '../Bookshelf/Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, onChangeShelf } = this.props;

    const shelves = [
      {
        title: 'Currently Reading',
        type: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        type: 'wantToRead'
      },
      {
        title: 'Read',
        type: 'read'
      }
    ];

    return (
      <div className="list-books-content">
        <div>
          {shelves.map(({ type, title }) => (
            <Bookshelf
              key={type}
              title={title}
              shelf={type}
              books={books}
              onChangeShelf={onChangeShelf}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListBooks;
