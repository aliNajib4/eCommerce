import { createSlice } from "@reduxjs/toolkit";
import TLoading from "@types/loading";
import actSignUp from "./act/actSignUp";
import actSignIn from "./act/actSignIn";

type TInitialState = {
  loading: TLoading;
  error: string | null;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  accessToken: string | null;
};

const initialState: TInitialState = {
  loading: "idle",
  error: null,
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actSignUp.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actSignUp.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actSignUp.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(actSignIn.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actSignIn.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        console.log(action.payload);
      })
      .addCase(actSignIn.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export { actSignUp, actSignIn };
export const { cleanUp, logout } = authSlice.actions;
export default authSlice.reducer;
