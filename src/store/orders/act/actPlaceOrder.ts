import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotle: number, { rejectWithValue, getState }) => {
    const {
      auth: {
        user: { id: userId },
      },
      cart: { productsFullinfo: cartItems },
    } = getState() as RootState;

    if (cartItems.length === 0) return rejectWithValue("Cart is Empty");

    let data;
    let error = false;
    let errorMag = "";

    const items = cartItems.map((el) => ({
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: el.quantity,
      id: el.id,
    }));

    await axios
      .post(`/orders`, { userId, subtotle, items })
      .then((res) => res.data)
      .then((dataResponse) => {
        data = dataResponse;
      })
      .catch((err) => {
        error = true;
        errorMag = err.message;
      });

    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actPlaceOrder;
