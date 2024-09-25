import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/config";

const actSignUp = createAsyncThunk(
  "auth/actSignUp",
  async (
    inputs: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confim_password?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      updateProfile(auth.currentUser, {
        displayName: `${inputs.firstName} ${inputs.lastName}`,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actSignUp;
