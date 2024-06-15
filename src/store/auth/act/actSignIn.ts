import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

type TResponse = {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actSignIn = createAsyncThunk(
  "auth/actSignIn",
  async (inputs: unknown, { rejectWithValue }) => {
    let data;
    let error = false;
    let errorMag = "";
    await axios
      .post<TResponse>("/signin", inputs)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        error = true;
        errorMag = err.response?.data;
      });
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actSignIn;
