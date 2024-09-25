import { createAsyncThunk } from "@reduxjs/toolkit";
import TProduct from "@types/product";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

type TData = TProduct;

const actGetTopSellingProducts = createAsyncThunk(
  "products/actGetTopSellingProducts",
  async (_, { rejectWithValue, signal }) => {
    const docRef = collection(db, "top-selling");
    try {
      const docSnap = await getDocs(docRef);
      return docSnap.docs.map((item) => item.data() as TData);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export default actGetTopSellingProducts;
