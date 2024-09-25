import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";

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

    const products = cartItems.map((el) => ({
      name: el.name,
      price: el.price,
      img: el.main_img,
      quantity: items.find((item) => item.id === el.id)?.quantity || 1,
      id: el.id,
    }));

    try {
      await addDoc(collection(db, "orders"), {
        userId,
        subtotal,
        items: products,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actPlaceOrder;
