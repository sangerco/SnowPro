import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";

interface NewUserData {
  id?: string;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface UserData {
  id: string;
  username: string;
  password: string;
  email?: string;
  first_name: string;
  last_name: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthState {
  data: NewUserData | UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  data: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (newUserData: NewUserData) => {
    const response = await axios.post(`${URL}/api/new-user`, newUserData);
    const user = response.data.user;
    const token = response.data.token;
    return { user, token };
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData: LoginData) => {
    const response = await axios.post(`${URL}/login`, loginData);
    console.log(response);
    const token = response.data.token;
    const user = response.data.user;
    return { token, user };
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Action failed! User not created!";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed!";
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Logout failed!";
      });
  },
});

export default authSlice.reducer;
