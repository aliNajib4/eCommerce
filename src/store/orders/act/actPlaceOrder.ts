import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, { rejectWithValue, getState }) => {
    const {
      auth: {
        user: { id: userId },
      },
      cart: { productsFullinfo: cartItems, items },
    } = getState() as RootState;

    if (cartItems.length === 0) return rejectWithValue("Cart is Empty");

    let data;
    let error = false;
    let errorMag = "";

    const products = cartItems.map((el) => ({
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: items.find((item) => item.id === el.id)?.quantity || 1,
      id: el.id,
    }));

    await axios
      .post(`/orders`, { userId, subtotal, items: products })
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
