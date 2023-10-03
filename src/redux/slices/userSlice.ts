import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";
import { logoutUser } from "./authSlice";
import { store } from "../store";

export interface UserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  bio?: string;
  isAdmin: boolean;
  videos?: string[];
  photos?: string[];
  favMountains?: string[];
}

export interface UpdateUserData {
  id?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  bio?: string;
  isAdmin?: boolean;
  videos?: string[];
  photos?: string[];
  favMountains?: string[];
}

interface UserState {
  user: UserData | null;
  users: UserData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  users: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axios.get(`${URL}/users/all-users`);
    const users = response.data.users;
    return users;
  }
);

export const fetchOneUser = createAsyncThunk(
  "user/fetchOneUser",
  async (username: string) => {
    const response = await axios.get(`${URL}/users/${username}`);
    const user = response.data.user;
    return user;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updateData: UpdateUserData) => {
    const response = await axios.patch(
      `${URL}/api/users/${updateData.username}`,
      updateData
    );
    const user = response.data.user as UserData;
    return user;
  }
);

export const makeUserAdmin = createAsyncThunk(
  "user/makeUserAdmin",
  async (updateData: UpdateUserData) => {
    const response = await axios.patch(
      `${URL}/api/users/${updateData.username}`,
      updateData
    );
    const user = response.data.user;
    return user;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (username: string) => {
    await store.dispatch(logoutUser());

    await axios.delete(`${URL}/api/users/${username}`);
    return null;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOneUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchOneUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOneUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(makeUserAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        makeUserAdmin.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(makeUserAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
