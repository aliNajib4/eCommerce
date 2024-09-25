import { createAsyncThunk } from "@reduxjs/toolkit";
import { type TProduct } from "@types/.";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

type TData = TProduct;

const actGetProduct = createAsyncThunk(
  "products/actGetProduct",
  async (id: string, { rejectWithValue, signal }) => {
    const docRef = doc(db, "products", id);
    try {
      const docSnap = await getDoc(docRef);
      return docSnap.data() as TData;
    } catch (err) {
      return rejectWithValue(JSON.stringify(err));
    }
  },
);

export default actGetProduct;
