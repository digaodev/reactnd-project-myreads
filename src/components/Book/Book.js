import React, { Component } from 'react';

class book extends Component {
  render() {
    const { book, onChangeShelf } = this.props;

    const bgImage = book.imageLinks ? book.imageLinks.thumbnail : '';

    const title = book.title || 'No title available';

    const authors = book.authors
      ? book.authors.join(', ')
      : 'No authors available';

    if (!book.shelf) {
      book.shelf = 'none';
    }
    const shelf = book.shelf;

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

export default book;
