import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const api = "/LoginData.json";
export const fetchData = createAsyncThunk("store/fetchData", async () => {
  return fetch(api)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    loggedin: null,
    isexist: null,
    user: [],
    showHome: null,
  },
  reducers: {
    login(state, action) {
      const data = action.payload;
      if (data.username.length !== 0 && data.password.length !== 0) {
        const finduser = state.users.find(
          (item) =>
            item.username === data.username && item.password === data.password
        );
        if (finduser) {
          state.loggedin = true;
          state.user = data;
          state.showHome = true;
        } else {
          state.loggedin = false;
          state.showHome = false;
        }
      }
    },
    register(state, action) {
      const data = action.payload;
      if (data.username.length !== 0 && data.password.length !== 0) {
        const find = state.users.find(
          (item) =>
            (item.username == data.username &&
              item.password == data.password) ||
            (data.username.length == 0 && data.password.length == 0)
        );
        if (!find) {
          state.isexist = true;
          state.users.push(data);
          state.user = { username: data.username, password: data.password };
          console.log(state.user);
        } else {
          state.isexist = false;
        }
      }
    },
    logout(state) {
      state.user = [];
      state.loggedin = null;
    },
    resetState(state) {
      state.loggedin = null;
      state.isexist = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.users = action.payload.data;
    });
  },
});

export default AuthSlice.reducer;
export const { login, register, logout, resetState } = AuthSlice.actions;
