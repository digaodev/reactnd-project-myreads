import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { book, onChangeShelf } = this.props;

    const bgImage = book.imageLinks
      ? book.imageLinks.thumbnail
      : 'http://via.placeholder.com/128x193?text=No%20Cover';

    const title = book.title || 'No title available';

    const authors = book.authors
      ? book.authors.join(', ')
      : 'No authors available';

    const shelf = book.shelf ? book.shelf : 'none';

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${bgImage}")`
              }}
            />
            <div className="book-shelf-changer">
              <select
                role="combobox"
                aria-expanded="false"
                tabIndex="0"
                aria-label="Move book to shelf"
                value={shelf}
                onChange={ev => onChangeShelf(book, ev.target.value)}
              >
                <option role="option" value="move" disabled>
                  Move to...
                </option>
                <option role="option" value="currentlyReading">
                  Currently Reading
                </option>
                <option role="option" value="wantToRead">
                  Want to Read
                </option>
                <option role="option" value="read">
                  Read
                </option>
                <option role="option" value="none">
                  None
                </option>
              </select>
            </div>
          </div>
          <div className="book-title" tabIndex="0">
            {title}
          </div>
          <div className="book-authors" tabIndex="0">
            {authors}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
