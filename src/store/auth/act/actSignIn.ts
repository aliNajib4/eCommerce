import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";

const actSignIn = createAsyncThunk(
  "auth/actSignIn",
  async (
    inputs: {
      email: string;
      password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actSignIn;
