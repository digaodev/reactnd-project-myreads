import React from 'react';

import Bookshelf from '../Bookshelf/Bookshelf';

const listBooks = props => (
  <div className="list-books-content">
    <div>
      <Bookshelf
        title="Currently Reading"
        shelf="currentlyReading"
        books={props.books}
        onChangeShelf={props.onChangeShelf}
      />
      <Bookshelf
        title="Want to Read"
        shelf="wantToRead"
        books={props.books}
        onChangeShelf={props.onChangeShelf}
      />
      <Bookshelf
        title="Read"
        shelf="read"
        books={props.books}
        onChangeShelf={props.onChangeShelf}
      />
    </div>
  </div>
);

export default listBooks;
