import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actSignUp = createAsyncThunk(
  "auth/actSignUp",
  async (inputs: unknown, { rejectWithValue }) => {
    let data;
    let error = false;
    let errorMag = "";
    await axios
      .post("/signup", inputs)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        error = true;
        errorMag = err.respones?.data;
      });
    await axios.post("/wishlist", {
      useId: "0",
      productsId: [],
    });
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actSignUp;
