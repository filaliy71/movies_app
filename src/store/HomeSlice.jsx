import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Api_key = "6873db75b210f58cfd84af652461fdc6";
const base_url = "https://api.themoviedb.org/3";
const get_movies = "/discover/movie";
const get_tv = "/discover/tv";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczZGI3NWIyMTBmNThjZmQ4NGFmNjUyNDYxZmRjNiIsInN1YiI6IjY1YTY0MTE5OWJjZDBmMDEzMmJhNzBkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z7xJd6bfTVRc8FTUDKQaom6c_p7ovSfBH_rXMTqDUKA",
  },
};
export const fetchMovies = createAsyncThunk(
  "home/fetchMovies",
  async (page) => {
    const api_url = `${base_url}${get_movies}?api_key=${Api_key}&page=${page}`;

    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
);

export const fetchTvShow = createAsyncThunk(
  "home/fetchTvShow",
  async (page) => {
    const api_url = `${base_url}${get_tv}?api_key=${Api_key}&page=${page}`;

    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching TV shows:", error);
      throw error;
    }
  }
);

export const fetchSearch = createAsyncThunk(
  "home/fetchSearch",
  async (query) => {
    const api_url = `${base_url}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;

    try {
      const response = await fetch(api_url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  }
);

const initialState = {
  movies_List: [],
  tv_List: [],
  search_list: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  setCurrentPage: (state, action) => {
    state.currentPage = action.payload;
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies_List = action.payload.results;
    });
    builder.addCase(fetchTvShow.fulfilled, (state, action) => {
      state.tv_List = action.payload.results;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.search_list = action.payload;
    });
  },
});

export default homeSlice.reducer;
