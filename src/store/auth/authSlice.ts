import { createSlice } from "@reduxjs/toolkit";
import TLoading from "@types/loading";
import actSignUp from "./act/actSignUp";
import actSignIn from "./act/actSignIn";
import actLogOut from "./act/actLogOut";

type TInitialState = {
  loading: TLoading;
  error: string | null;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
};

const initialState: TInitialState = {
  loading: "idle",
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.loading = "idle";
      state.error = null;
    },

    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // signup

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

      // signin

    builder
      .addCase(actSignIn.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actSignIn.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actSignIn.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

      // log out

    builder
      .addCase(actLogOut.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actLogOut.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actLogOut.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export { actSignUp, actSignIn, actLogOut };
export const { cleanUp, getUser } = authSlice.actions;
export default authSlice.reducer;
