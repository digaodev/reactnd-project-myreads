import React, { Component } from 'react';

class book extends Component {
  render() {

    const bgImage = this.props.book.imageLinks
      ? this.props.book.imageLinks.thumbnail
      : '';
    const title = this.props.book.title || 'No title available';
    const authors = this.props.book.authors
      ? this.props.book.authors.join(', ')
      : 'No authors available';

    if (!this.props.book.shelf) {
      this.props.book.shelf = 'none';
    }
    const shelf = this.props.book.shelf;

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
                value={shelf}
                onChange={ev =>
                  this.props.onChangeShelf(this.props.book, ev.target.value)
                }
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}

export default book;
