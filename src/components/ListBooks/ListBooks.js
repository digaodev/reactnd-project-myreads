import React, { Component } from 'react';

import Bookshelf from '../Bookshelf/Bookshelf';

class ListBooks extends Component {
  render() {
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
          {shelves.map(shelf => (
            <Bookshelf
              key={shelf.type}
              title={shelf.title}
              shelf={shelf.type}
              books={this.props.books}
              onChangeShelf={this.props.onChangeShelf}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListBooks;
