import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:1711/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
      /* error.message here is a Payload For getBooks.rejected reducer  */
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      bookData.username = getState().auth.username;
      const res = await fetch("http://localhost:1711/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        // bookData Must Be An Object
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:1711/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  books: [],
  isLoading: false,
  error: null,
  bookInfo: null,
};
const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: {
    // get Books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // insert Book
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // delete book
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((book) => book.id !== action.payload);
      // state.books = state.books.filter((i) => i.id !== action.meta.arg);
      // Action payload Come From return value in createAsuncThunk Function
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
