import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserName, logInOut } from "../store/authSlice";
import { useRef } from "react";
const Header = () => {
  const { error } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const username = useRef();

  useEffect(() => {
    isLoggedIn
      ? (username.current.placeholder = "Enter Username")
      : (username.current.placeholder = "You Logged In");
    username.current.value = "";
  }, [isLoggedIn]);

  return (
    <Fragment>
      {error && (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      )}

      <nav className="navbar navbar-dark bg-dark d-flex">
        <span className="navbar-brand mb-0 h1">My Books</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(logInOut());
            isLoggedIn && dispatch(getUserName(username.current.value));
          }}
        >
          <div className="form-group mb-0 d-flex column">
            <input
              type="text"
              className="form-control mr-2"
              id="title"
              ref={username}
              disabled={!isLoggedIn}
              required
            />
            <button className="btn btn-outline-primary" type="submit">
              {isLoggedIn ? "Log In" : "Log Out"}
            </button>
          </div>
        </form>
      </nav>
    </Fragment>
  );
};

export default Header;
