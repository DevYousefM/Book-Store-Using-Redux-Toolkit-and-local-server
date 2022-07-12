import React, { Fragment } from "react";

const PostInfo = ({ bookData }) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      {bookData ? (
        <div>
          <p className="fw-bold">Title: {bookData.title}</p>
          <p className="fst-italic">Price: {bookData.price}$</p>
          <p className="fst-italic">
            Auther: {bookData.username ? bookData.username : "Guest"}
          </p>

          <p className="fw-light">Description: {bookData.description}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default React.memo(PostInfo);
