import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { type TProduct } from "@types/.";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

type TData = TProduct;

const actGetCartProducts = createAsyncThunk(
  "cart/actGetCartProducts",
  async (_, { rejectWithValue, getState, signal }) => {
    const { cart } = getState() as RootState;
    const ids = cart.items.map((el) => el.id);
    if (ids.length === 0) return [];

    const q = query(collection(db, "products"), where("id", "in", ids));
    try {
      const docSnap = await getDocs(q);
      return docSnap.docs.map((el) => el.data() as TData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actGetCartProducts;
