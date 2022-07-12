import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook } from "../../store/BookSlice";
const BooksList = ({ loading, books, isLoggedIn, getBookId }) => {
  const dispatch = useDispatch();
  const bookList =
    books.length > 0 ? (
      books.map((book) => (
        <li
          className="list-group-item d-flex  justify-content-between align-items-center"
          key={book.id}
        >
          <div>{book.title}</div>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                getBookId(book.id);
              }}
            >
              Read
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={isLoggedIn}
              onClick={() => {
                dispatch(deleteBook(book.id));
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <div className="alert alert-secondary" role="alert">
        There is no books Found
      </div>
    );
  return (
    <div>
      <h2>Books List</h2>
      {loading ? (
        <div className="alert alert-secondary" role="alert">
          Loading...
        </div>
      ) : (
        <ul className="list-group">{bookList}</ul>
      )}
    </div>
  );
};

export default BooksList;
