import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { User } from "../types";
import { generateMockUsers } from "../utils/mockData";

interface UsersState {
  users: User[];
  selectedUserId: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUserId: null,
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return generateMockUsers(1000000);
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<{ id: number; userData: Partial<User> }>
    ) => {
      const { id, userData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...userData };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Произошла ошибка";
      });
  },
});

export const { setSelectedUser, updateUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectSelectedUserId = (state: RootState) =>
  state.users.selectedUserId;
export const selectSelectedUser = (state: RootState) => {
  const { users, selectedUserId } = state.users;
  return selectedUserId
    ? users.find((user) => user.id === selectedUserId) || null
    : null;
};

export default usersSlice.reducer;
