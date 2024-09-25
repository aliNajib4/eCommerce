import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

const actLogOut = createAsyncThunk(
  "auth/actLogOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actLogOut;
