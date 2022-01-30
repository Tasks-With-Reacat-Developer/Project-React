import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// inset New Login
export const userSignUp = createAsyncThunk("Auth/signup", async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`https://products-m7fy.herokuapp.com/auth/signup`, user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// inset New Login
export const userLogIn = createAsyncThunk("Auth/login", async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("https://products-m7fy.herokuapp.com/auth/login", user)
      localStorage.setItem('myToken', JSON.stringify({Token: res.data.accessToken}));
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUserData = createAction("loadData", function prepare() {
  const userData = JSON.parse(localStorage.getItem("user"));
  return {
    payload: userData,
  };
});

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    userData: null,
    isLoggedIn: false,
    loading: null,
    error: null,
  },
  reducers: {
    logOut: (state, action) => {
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    //load data
    [loadUserData]: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = !!action.payload;
    },

    // handle login
    [userLogIn.pending]: (state) => {
      state.loading = true;
    },
    [userLogIn.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    [userLogIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
